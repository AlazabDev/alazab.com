<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// معالجة OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// إعدادات قاعدة البيانات
$host = 'localhost';
$dbname = 'alazab_db';
$username = 'alazab_user';
$password = 'Alazab@2025';

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->exec("SET NAMES 'UTF8'");
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// معالجة POST requests (إضافة تقييم جديد)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data) {
        echo json_encode(['success' => false, 'message' => 'Invalid data format']);
        exit;
    }

    $name = $data['name'] ?? 'مستخدم';
    $email = $data['email'] ?? null;
    $rating = intval($data['rating'] ?? 5);
    $feedback = $data['feedback'] ?? '';
    $device = $data['device'] ?? $_SERVER['HTTP_USER_AGENT'];
    $android_version = $data['android_version'] ?? 'Unknown';
    $app_version = $data['app_version'] ?? '1.0.0';

    // التحقق من صحة البيانات
    if (empty($name) || empty($feedback)) {
        echo json_encode(['success' => false, 'message' => 'الرجاء إدخال الاسم ورأيك']);
        exit;
    }

    if ($rating < 1 || $rating > 5) {
        $rating = 5;
    }

    $stmt = $pdo->prepare("
        INSERT INTO tester_feedback (tester_name, tester_email, rating, feedback_text, device_info, android_version, app_version, status)
        VALUES (:name, :email, :rating, :feedback, :device, :android_version, :app_version, 'approved')
    ");

    $result = $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':rating' => $rating,
        ':feedback' => $feedback,
        ':device' => substr($device, 0, 255),
        ':android_version' => $android_version,
        ':app_version' => $app_version
    ]);

    if ($result) {
        // تحديث الإحصائيات
        $pdo->exec("
            INSERT INTO feedback_stats (total_feedback, avg_rating, five_stars, four_stars, three_stars, two_stars, one_star)
            SELECT 
                COUNT(*),
                AVG(rating)::DECIMAL(3,2),
                COUNT(CASE WHEN rating = 5 THEN 1 END),
                COUNT(CASE WHEN rating = 4 THEN 1 END),
                COUNT(CASE WHEN rating = 3 THEN 1 END),
                COUNT(CASE WHEN rating = 2 THEN 1 END),
                COUNT(CASE WHEN rating = 1 THEN 1 END)
            FROM tester_feedback
            WHERE status = 'approved'
            ON CONFLICT (id) DO UPDATE SET
                total_feedback = EXCLUDED.total_feedback,
                avg_rating = EXCLUDED.avg_rating,
                five_stars = EXCLUDED.five_stars,
                four_stars = EXCLUDED.four_stars,
                three_stars = EXCLUDED.three_stars,
                two_stars = EXCLUDED.two_stars,
                one_star = EXCLUDED.one_star,
                updated_at = CURRENT_TIMESTAMP
        ");

        echo json_encode(['success' => true, 'message' => 'شكراً لمشاركتك رأيك!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'حدث خطأ، حاول مرة أخرى']);
    }
    exit;
}

// معالجة GET requests (جلب التقييمات)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;

    // جلب التقييمات المعتمدة
    $stmt = $pdo->prepare("
        SELECT id, tester_name, rating, feedback_text, device_info, android_version, created_at
        FROM tester_feedback
        WHERE status = 'approved'
        ORDER BY created_at DESC
        LIMIT :limit
    ");
    $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
    $stmt->execute();
    $feedbacks = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // جلب الإحصائيات
    $stmtStats = $pdo->query("
        SELECT total_feedback, avg_rating, five_stars, four_stars, three_stars, two_stars, one_star
        FROM feedback_stats
        ORDER BY updated_at DESC
        LIMIT 1
    ");
    $stats = $stmtStats->fetch(PDO::FETCH_ASSOC);

    if (!$stats) {
        $stats = [
            'total_feedback' => 0,
            'avg_rating' => 0,
            'five_stars' => 0,
            'four_stars' => 0,
            'three_stars' => 0,
            'two_stars' => 0,
            'one_star' => 0
        ];
    }

    echo json_encode([
        'success' => true,
        'stats' => $stats,
        'feedbacks' => $feedbacks
    ]);
    exit;
}

// إذا لم تكن GET أو POST
echo json_encode(['success' => false, 'message' => 'Method not allowed']);
?>