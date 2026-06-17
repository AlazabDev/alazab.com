const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const { ResponseHandler } = require('../utils/ResponseHandler');
const { AppError } = require('../errors/AppError');
const { Database } = require('../db/Database');
const { Logger } = require('../utils/Logger');

const db = new Database();
const response = new ResponseHandler();
const logger = new Logger('gallery-routes');

// GET جميع الصور
router.get('/images', authenticate, async (req, res, next) => {
  try {
    const { category, limit = 100, offset = 0 } = req.query;
    
    let query = 'SELECT * FROM gallery_images WHERE deleted_at IS NULL';
    const params = [];
    
    if (category) {
      query += ' AND category = $1';
      params.push(category);
    }
    
    query += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(limit, offset);
    
    const result = await db.query(query, params);
    
    logger.info('Gallery images retrieved', { 
      count: result.rows.length, 
      category 
    });
    
    response.success(res, {
      images: result.rows,
      total: result.rows.length
    });
  } catch (error) {
    next(error);
  }
});

// GET صورة واحدة
router.get('/images/:id', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const result = await db.query(
      'SELECT * FROM gallery_images WHERE id = $1 AND deleted_at IS NULL',
      [id]
    );
    
    if (result.rows.length === 0) {
      throw new AppError('الصورة غير موجودة', 404);
    }
    
    response.success(res, { image: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

// POST إضافة صورة جديدة
router.post('/images', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { title, url, category, description, alt_text } = req.body;
    
    if (!title || !url || !category) {
      throw new AppError('البيانات المطلوبة: title, url, category', 400);
    }
    
    const result = await db.query(
      `INSERT INTO gallery_images 
       (title, url, category, description, alt_text, uploaded_by, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       RETURNING *`,
      [title, url, category, description, alt_text, req.user.id]
    );
    
    logger.info('Gallery image created', { 
      id: result.rows[0].id, 
      category,
      uploadedBy: req.user.id 
    });
    
    response.success(res, { 
      image: result.rows[0],
      message: 'تم إضافة الصورة بنجاح' 
    }, 201);
  } catch (error) {
    next(error);
  }
});

// PUT تحديث صورة
router.put('/images/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, alt_text, category } = req.body;
    
    const updates = [];
    const values = [id];
    let paramIndex = 2;
    
    if (title !== undefined) {
      updates.push(`title = $${paramIndex++}`);
      values.push(title);
    }
    if (description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(description);
    }
    if (alt_text !== undefined) {
      updates.push(`alt_text = $${paramIndex++}`);
      values.push(alt_text);
    }
    if (category !== undefined) {
      updates.push(`category = $${paramIndex++}`);
      values.push(category);
    }
    
    if (updates.length === 0) {
      throw new AppError('لا توجد بيانات للتحديث', 400);
    }
    
    updates.push(`updated_at = NOW()`);
    
    const result = await db.query(
      `UPDATE gallery_images 
       SET ${updates.join(', ')}
       WHERE id = $1 AND deleted_at IS NULL
       RETURNING *`,
      values
    );
    
    if (result.rows.length === 0) {
      throw new AppError('الصورة غير موجودة', 404);
    }
    
    logger.info('Gallery image updated', { id, updatedBy: req.user.id });
    
    response.success(res, { 
      image: result.rows[0],
      message: 'تم تحديث الصورة بنجاح' 
    });
  } catch (error) {
    next(error);
  }
});

// DELETE حذف صورة
router.delete('/images/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const result = await db.query(
      `UPDATE gallery_images 
       SET deleted_at = NOW(), deleted_by = $2
       WHERE id = $1 AND deleted_at IS NULL
       RETURNING *`,
      [id, req.user.id]
    );
    
    if (result.rows.length === 0) {
      throw new AppError('الصورة غير موجودة', 404);
    }
    
    logger.info('Gallery image deleted', { id, deletedBy: req.user.id });
    
    response.success(res, { 
      message: 'تم حذف الصورة بنجاح' 
    });
  } catch (error) {
    next(error);
  }
});

// GET إحصائيات المعرض
router.get('/stats', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const stats = await db.query(`
      SELECT 
        category,
        COUNT(*) as count,
        COALESCE(SUM(CASE WHEN deleted_at IS NULL THEN 1 ELSE 0 END), 0) as active,
        MAX(created_at) as latest
      FROM gallery_images
      GROUP BY category
      ORDER BY count DESC
    `);
    
    response.success(res, { stats: stats.rows });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
