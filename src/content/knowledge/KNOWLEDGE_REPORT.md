# تقرير شامل: مجلد قاعدة المعرفة
## `src/content/knowledge/`
### مشروع: AlazabDev/alazab.com
**تاريخ التقرير:** 2026-05-04  
**أعدّه:** Copilot Agent — فحص تلقائي شامل

---

## 1. ملخص عام

| البند | القيمة |
|---|---|
| إجمالي الملفات | **51 ملف** |
| إجمالي الحجم | **~437 كيلوبايت** |
| إجمالي الأسطر | **~8,590 سطر** |
| أكبر ملف | `meta_alazab_all.json` (~123 KB، 3654 سطر) |
| أصغر ملف | `dependency_links.txt` (سطر واحد فارغ) |

---

## 2. عدد الملفات حسب الامتداد

| الامتداد | العدد | الغرض الأساسي |
|---|---|---|
| `.txt` | 18 | نصوص قاعدة المعرفة الخام |
| `.json` | 14 | بيانات هيكلية منظمة للبرمجة |
| `.md` | 9 | توثيق بصيغة Markdown |
| `.yml` | 7 | إعدادات Rasa وبيانات منظمة |
| `.jsonl` | 2 | قاعدة معرفة للنماذج اللغوية (RAG) |
| `.example` | 1 | نموذج متغيرات البيئة |
| **المجموع** | **51** | |

---

## 3. قائمة الملفات الكاملة مع ملخص المحتوى

### 3.1 ملفات العلامة التجارية: مجموعة العزب (Alazab Group)

| الملف | الحجم | الوصف |
|---|---|---|
| `al-azab-group.txt` | 1.6 KB | نص تعريفي بأسلوب سردي شعري عن مجموعة العزب — يبرز فلسفة المنظومة المتكاملة وتجربة العميل من الفكرة حتى التشغيل |
| `alazab_group.txt` | 1 KB | نبذة تعريفية موجزة ومنظمة عن المجموعة — تسرد العلامات الخمس التابعة وبيانات التواصل العامة |
| `alazab_group.md` | ~3 KB | بيانات مفصّلة بصيغة Markdown تشمل التعريف المختصر والتفصيلي، الخدمات، الروابط، والمسار الوظيفي داخل الشات بوت |
| `alazab_group.json` | ~3 KB | البيانات ذاتها بصيغة JSON منظمة للاستهلاك البرمجي |
| `alazab_construction.txt` | 1.7 KB | ملف تعريفي بـ Alazab Construction (الشركة الأم) يتضمن الخدمات والمشاريع المنجزة ومعلومات التواصل |
| `company-profile.md` | ~12 KB | الملف التعريفي الرسمي الأشمل للمجموعة — يتضمن metadata، التاريخ، نطاق العمل، الشعار، الألوان، البيانات القانونية والضريبية |

### 3.2 ملفات العلامة: هوية العلامة التجارية (Brand Identity)

| الملف | الحجم | الوصف |
|---|---|---|
| `brand-identity-ar.txt` | 1.7 KB | نص تعريفي سردي/شعري بالعربية يشرح فلسفة الخدمة |
| `brand_identity.txt` | 1.3 KB | محتوى تفصيلي يشمل الخدمات، مراحل العمل، والقطاعات المخدومة |
| `brand_identity.md` | ~3 KB | نفس المحتوى بصيغة Markdown مع بنية أوضح للتوثيق |
| `brand_identity.json` | ~3 KB | بيانات JSON منظمة للشات بوت والتكامل البرمجي |
| `brand_identity.yml` | 1.4 KB | إعدادات Rasa domain (responses, utter_*) لهذه العلامة |

### 3.3 ملفات العلامة: التشطيب الراقي (Luxury Finishing)

| الملف | الحجم | الوصف |
|---|---|---|
| `luxury-finishing-ar.txt` | 2 KB | نص تعريفي سردي بأسلوب راقٍ يصف فلسفة التشطيب الفاخر |
| `luxury_finishing.txt` | 1.3 KB | خدمات تفصيلية، الخامات المتاحة، ومعلومات المعاينة |
| `luxury_finishing.md` | ~2.8 KB | بصيغة Markdown مع بنية منظمة |
| `luxury_finishing.json` | ~2.8 KB | بصيغة JSON للتكامل البرمجي |
| `luxury_finishing.yml` | 1.5 KB | إعدادات Rasa domain لهذه العلامة |

### 3.4 ملفات العلامة: أوبرفيكس (UberFix)

| الملف | الحجم | الوصف |
|---|---|---|
| `uberfix-ar.txt` | 2.2 KB | نص تعريفي سردي يصف أوبرفيكس كـ"الفتى المدلل" في المنظومة |
| `uberfix.txt` | 1.4 KB | خدمات الصيانة، باقات الاشتراك، والمميزات |
| `uberfix.md` | ~2.6 KB | بصيغة Markdown منظمة |
| `uberfix.json` | ~2.7 KB | بصيغة JSON للتكامل البرمجي |
| `uberfix.yml` | 1.4 KB | إعدادات Rasa domain لأوبرفيكس |

### 3.5 ملفات العلامة: لبن العصفور (Laban Alasfour)

| الملف | الحجم | الوصف |
|---|---|---|
| `laban-alasfour-ar.txt` | 1.6 KB | نص تعريفي سردي عن خدمة توريد المواد النادرة |
| `laban_alasfour.txt` | 1.5 KB | المنتجات، خدمة التوصيل، وطلبات الجملة |
| `laban_alasfour.md` | ~2.8 KB | بصيغة Markdown |
| `laban_alasfour.json` | ~2.9 KB | بصيغة JSON |
| `laban_alasfour.yml` | 1.2 KB | إعدادات Rasa domain للبن العصفور |

### 3.6 ملفات قاعدة المعرفة الموحدة (Enterprise Knowledge)

| الملف | الحجم | الوصف |
|---|---|---|
| `alazab_enterprise_master_knowledge.json` | 17.7 KB | قاعدة المعرفة الرئيسية الكاملة — تجمع بيانات جميع العلامات، سياسة الإجابة، معلومات التواصل، الروابط، والشعارات |
| `alazab_enterprise_master_knowledge.md` | 3.6 KB | نفس قاعدة المعرفة بصيغة Markdown للتوثيق |
| `enterprise_knowledge_chunks.jsonl` | 62.8 KB | قاعدة المعرفة مقسمة إلى **71 chunk** جاهزة للفهرسة بنظام RAG |
| `enterprise_knowledge_corpus.jsonl` | 61.4 KB | **58 وثيقة** كاملة كـ corpus للنماذج اللغوية |
| `knowledge_base.txt` | 12.8 KB | نص موحد يجمع محتوى جميع العلامات + نصوص البوت الصوتي — مناسب للمعالجة النصية البسيطة |

### 3.7 ملفات الأسئلة الشائعة (FAQs)

| الملف | الحجم | الوصف |
|---|---|---|
| `faqs_ar.json` | 20.3 KB | **462 سطر** — قائمة شاملة من الأسئلة الشائعة بالعربية بصيغة JSON (id، brand_id، question، answer، tags) |
| `faqs_ar.yml` | 5.7 KB | نفس الأسئلة الشائعة بصيغة YAML لـ Rasa |

### 3.8 ملفات قواعد توجيه النوايا (Intent Routing)

| الملف | الحجم | الوصف |
|---|---|---|
| `intent_routing_rules.json` | 2.2 KB | قواعد التوجيه **الإصدار 1.0** — قواعد بسيطة بالكلمات المفتاحية للتوجيه بين العلامات |
| `enterprise_intent_routing_rules.json` | 7.7 KB | قواعد التوجيه **الإصدار 2.0.0** — نسخة موسّعة ومحسّنة تشمل الأولوية، الفالباك، وقواعد أكثر تفصيلاً |

### 3.9 ملفات WhatsApp وMeta API

| الملف | الحجم | الوصف |
|---|---|---|
| `meta_alazab_all.json` | 123 KB | **الملف الأكبر** — بيانات كاملة من Meta API تشمل 7 حسابات WABA و88 قالب WhatsApp (sanitized — بدون مفاتيح سرية) |
| `meta_public_summary.json` | 744 B | ملخص عام آمن للبيانات الأساسية (App ID، معرف العمل، عدد الحسابات والقوالب) |
| `waba_inventory.sanitized.json` | 4 KB | جرد الـ 7 حسابات WhatsApp Business مع تفاصيل الأرقام والتحقق والحالة |
| `whatsapp_templates_inventory.sanitized.json` | 25 KB | جرد **88 قالب رسائل** WhatsApp (الاسم، اللغة، الحالة، الفئة) |
| `meta_whatsapp.env.example` | 1 KB | نموذج آمن لملف متغيرات البيئة — يستخدم placeholders بدلاً من القيم الحقيقية |

### 3.10 ملفات Rasa Domain

| الملف | الحجم | الوصف |
|---|---|---|
| `general.yml` | 15.8 KB | ملف Rasa domain العام — يتضمن slots، responses، forms، وactions المشتركة بين جميع العلامات |
| `alazab.yml` | 1.7 KB | ملف Rasa domain خاص بـ Alazab Construction — يحتوي على utter_* responses |

### 3.11 ملفات الصوت (Voice Bot)

| الملف | الحجم | الوصف |
|---|---|---|
| `voice_knowledge_base_tts.txt` | 3.5 KB | نصوص مُحسَّنة للقراءة الصوتية (TTS) — تقديمات مختصرة لكل علامة تجارية بأسلوب محادثة شفهية |

### 3.12 ملفات التوثيق والحوكمة

| الملف | الحجم | الوصف |
|---|---|---|
| `content_governance.md` | 431 B | سياسة حوكمة المحتوى — قواعد المعلومات التي لا يجوز للبوت إخراجها دون اعتماد بشري، ودورة التحديث |
| `deployment_runbook.md` | 688 B | دليل خطوات النشر — يوضح كيفية دمج الملفات مع Rasa وRAG وWhatsApp |
| `documents_index.json` | 10.4 KB | فهرس وصفي لجميع الوثائق (id، العنوان، brand_id، النوع، الحجم بالأحرف) |

### 3.13 ملفات Python Egg-Info (خارج نطاق قاعدة المعرفة)

| الملف | الحجم | الوصف |
|---|---|---|
| `SOURCES.txt` | 859 B | قائمة بجميع ملفات مشروع Python (alazab_group_rasa_bot) — ملف egg-info تلقائي |
| `dependency_links.txt` | 1 بايت | ملف egg-info فارغ تمامًا |
| `requires.txt` | 232 B | قائمة متطلبات Python (rasa-pro، rasa-sdk، fastapi، إلخ) |
| `top_level.txt` | 16 B | يحدد الحزم الرئيسية: actions، webhook |

### 3.14 ملف القالب

| الملف | الحجم | الوصف |
|---|---|---|
| `template.txt` | 1.9 KB | أسئلة شائعة جاهزة بالإنجليزية حول Rasa CALM — يبدو أنه قالب تجريبي لنظام Rasa |

---

## 4. إبراز الملفات المكررة أو الزائدة

### 4.1 تكرار مقصود (لأغراض مختلفة) ✅

لكل علامة تجارية رئيسية **4–5 صيغ** للملف ذاته:

| المجموعة | .txt (سردي) | .txt (تفصيلي) | .md | .json | .yml |
|---|---|---|---|---|---|
| مجموعة العزب | `al-azab-group.txt` | `alazab_group.txt` | ✅ | ✅ | — |
| Brand Identity | `brand-identity-ar.txt` | `brand_identity.txt` | ✅ | ✅ | ✅ |
| Luxury Finishing | `luxury-finishing-ar.txt` | `luxury_finishing.txt` | ✅ | ✅ | ✅ |
| UberFix | `uberfix-ar.txt` | `uberfix.txt` | ✅ | ✅ | ✅ |
| Laban Alasfour | `laban-alasfour-ar.txt` | `laban_alasfour.txt` | ✅ | ✅ | ✅ |

> **ملاحظة:** هذا التكرار **مقصود وصحيح** — كل صيغة لها استخدام مختلف:
> - **`*-ar.txt`**: نصوص سردية فلسفية للعرض الأمامي وسياق الشات بوت
> - **`*.txt`**: معلومات تفصيلية للمعالجة النصية والبوت
> - **`*.md`**: توثيق للمطورين
> - **`*.json`**: تكامل برمجي واستهلاك API
> - **`*.yml`**: Rasa domain configuration

### 4.2 تكرار في قواعد التوجيه ⚠️

| الملف | الإصدار | التوصية |
|---|---|---|
| `intent_routing_rules.json` | v1.0 (قديم) | يمكن أرشفته أو حذفه |
| `enterprise_intent_routing_rules.json` | v2.0.0 (الأحدث) | هذا هو الملف الفعّال |

> **التوصية:** `enterprise_intent_routing_rules.json` هو الملف الأشمل والأحدث. يُنصح بالاعتماد عليه وتوضيح في التوثيق أن `intent_routing_rules.json` هو نسخة قديمة.

### 4.3 تكرار في الأسئلة الشائعة ⚠️

| الملف | الغرض |
|---|---|
| `faqs_ar.json` | للاستهلاك البرمجي وAPI |
| `faqs_ar.yml` | لـ Rasa domain مباشرة |

> **التوصية:** التكرار مقصود لو كان يُغذّي نظامين مختلفين (JSON للـ API، YAML لـ Rasa). يُنصح بإضافة تعليق في رأس كل ملف يوضح مصدر الحقيقة الواحد.

### 4.4 ملفات خارج نطاق قاعدة المعرفة 🚫

الملفات التالية هي ملفات **Python Egg-Info** تخص مشروع Rasa Bot وتُولَّد تلقائيًا، ووُجودها في مجلد قاعدة المعرفة غير مناسب:

| الملف | المشكلة |
|---|---|
| `SOURCES.txt` | ملف egg-info لمشروع `alazab_group_rasa_bot` — لا صلة له بقاعدة المعرفة |
| `dependency_links.txt` | ملف egg-info فارغ تمامًا |
| `requires.txt` | متطلبات Python pip — ينتمي لجذر المشروع أو مجلد Rasa |
| `top_level.txt` | يحدد حزم Python `actions` و`webhook` |

> **التوصية:** نقل هذه الملفات إلى `alazab_group_rasa_bot.egg-info/` أو حذفها من المجلد وإضافتها إلى `.gitignore`.

---

## 5. الملاحظات التقنية الهامة

### 5.1 ⚠️ أرقام هاتف غير مكتملة

في الملفات التالية، أرقام الواتساب مُدخَلة كـ placeholder وليست أرقام حقيقية:
- `alazab_construction.txt` — `واتساب: [رقم الشركة]`
- `uberfix.txt` — `للطوارئ: تواصل عبر الواتساب فورًا` (بدون رقم)
- بعض ملفات `.txt` التفصيلية الأخرى

> **التوصية:** تحديث هذه الحقول بالأرقام الفعلية أو الروابط الصحيحة قبل النشر في الإنتاج.

### 5.2 ⚠️ ملف `template.txt` — محتوى إنجليزي وغير مرتبط

يحتوي `template.txt` على أسئلة وأجوبة Rasa CALM **باللغة الإنجليزية** لا علاقة لها ببيانات العلامات التجارية العربية. يبدو أنه قالب تجريبي تم نسيانه في المجلد.

> **التوصية:** نقله إلى مجلد التوثيق أو حذفه إن لم يكن مستخدمًا.

### 5.3 ✅ حماية البيانات الحساسة — تطبيق صحيح

- ملف `meta_whatsapp.env.example` يستخدم `__SET_IN_SECRET_MANAGER__` بشكل صحيح
- جميع ملفات `*.sanitized.json` تم حذف مفاتيح الوصول منها
- `meta_public_summary.json` يوضح أن "القيم الحقيقية داخل Secret Manager"

> **👍 ممارسة ممتازة:** البيانات الحساسة محمية جيدًا.

### 5.4 ⚠️ بيانات شخصية في ملفات Sanitized

رغم أن ملفات `*.sanitized.json` لا تحتوي على مفاتيح API، إلا أنها تحتوي على:
- أرقام هاتف حقيقية (مثل `+20 10 92750351`، `+20 11 46397010`)
- أسماء أصحاب الحسابات (مثل `"Mohamed Azab"`)
- معرّفات WABA الحقيقية

> **التوصية:** مراجعة ما إذا كانت هذه البيانات مقبولة للنشر العام في المستودع.

### 5.5 ✅ هيكل قاعدة المعرفة للذكاء الاصطناعي — جيد

- `enterprise_knowledge_chunks.jsonl` — 71 chunk جاهزة لـ RAG
- `enterprise_knowledge_corpus.jsonl` — 58 وثيقة كاملة
- كلا الملفين بهيكل `id`, `brand_id`, `language`, `content`, `metadata` المناسب لأنظمة الفهرسة الحديثة

### 5.6 ⚠️ `knowledge_base.txt` — ملف ضخم جامع

`knowledge_base.txt` (202 سطر، 12.8 KB) يجمع محتوى جميع العلامات التجارية + نصوص Voice Bot في ملف واحد. هذا مفيد للمعالجة البسيطة لكنه يصعب صيانته مستقلاً عند تحديث العلامات الفردية.

> **التوصية:** توضيح في التوثيق أن هذا الملف **مُولَّد تلقائيًا** (أو يجب أن يكون كذلك) من الملفات الفردية.

### 5.7 ✅ التوثيق والحوكمة — موجودان

- `content_governance.md` — يحدد قواعد صارمة (لا أسعار نهائية بدون اعتماد)
- `deployment_runbook.md` — خطوات نشر واضحة
- `documents_index.json` — فهرس وصفي للوثائق

---

## 6. ملخص بياني للهيكل

```
src/content/knowledge/
│
├── 📦 العلامات التجارية (5 × 4-5 صيغ = ~22 ملف)
│   ├── Alazab Group      → al-azab-group.txt, alazab_group.{txt,md,json}
│   ├── Brand Identity    → brand-identity-ar.txt, brand_identity.{txt,md,json,yml}
│   ├── Luxury Finishing  → luxury-finishing-ar.txt, luxury_finishing.{txt,md,json,yml}
│   ├── UberFix           → uberfix-ar.txt, uberfix.{txt,md,json,yml}
│   └── Laban Alasfour    → laban-alasfour-ar.txt, laban_alasfour.{txt,md,json,yml}
│
├── 📚 قاعدة المعرفة الموحدة (5 ملفات)
│   ├── alazab_enterprise_master_knowledge.{json,md}
│   ├── enterprise_knowledge_{chunks,corpus}.jsonl
│   └── knowledge_base.txt
│
├── ❓ الأسئلة الشائعة (2 ملفات)
│   └── faqs_ar.{json,yml}
│
├── 🔀 قواعد التوجيه (2 ملفات)
│   ├── intent_routing_rules.json        (v1.0 — قديم)
│   └── enterprise_intent_routing_rules.json  (v2.0 — الأحدث)
│
├── 📱 WhatsApp & Meta (5 ملفات)
│   ├── meta_alazab_all.json
│   ├── meta_public_summary.json
│   ├── waba_inventory.sanitized.json
│   ├── whatsapp_templates_inventory.sanitized.json
│   └── meta_whatsapp.env.example
│
├── ⚙️ Rasa Domain (2 ملفات)
│   ├── general.yml
│   └── alazab.yml
│
├── 🏢 التوثيق والحوكمة (4 ملفات)
│   ├── company-profile.md
│   ├── content_governance.md
│   ├── deployment_runbook.md
│   └── documents_index.json
│
├── 🔊 Voice Bot (1 ملف)
│   └── voice_knowledge_base_tts.txt
│
├── 🏗️ Alazab Construction (1 ملف)
│   └── alazab_construction.txt
│
├── ⚠️ ملفات خارج نطاق قاعدة المعرفة (4 ملفات)
│   ├── SOURCES.txt          (egg-info)
│   ├── dependency_links.txt (egg-info فارغ)
│   ├── requires.txt         (متطلبات Python)
│   └── top_level.txt        (حزم Python)
│
└── ⚠️ ملفات متنوعة (1 ملف)
    └── template.txt         (قالب Rasa CALM بالإنجليزية)
```

---

## 7. التوصيات الختامية

| الأولوية | التوصية |
|---|---|
| 🔴 عاجل | إكمال أرقام الواتساب الناقصة في ملفات .txt (`[رقم الشركة]`) |
| 🟠 مهم | نقل ملفات egg-info (`SOURCES.txt`، `dependency_links.txt`، `requires.txt`، `top_level.txt`) خارج مجلد قاعدة المعرفة |
| 🟠 مهم | توضيح أن `intent_routing_rules.json` هو الإصدار القديم وأن `enterprise_intent_routing_rules.json` هو الفعّال |
| 🟡 مقترح | نقل أو حذف `template.txt` (محتوى Rasa CALM إنجليزي لا صلة له ببيانات العلامات) |
| 🟡 مقترح | توضيح في التوثيق أن `knowledge_base.txt` مُولَّد من الملفات الفردية وليس مصدر حقيقة مستقل |
| 🟢 للمراجعة | مراجعة ما إذا كانت الأرقام والأسماء في `waba_inventory.sanitized.json` مقبولة للنشر العام |

---

*تم إنشاء هذا التقرير تلقائيًا بواسطة GitHub Copilot Agent في 2026-05-04*
