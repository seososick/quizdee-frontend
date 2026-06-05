# Quizdee MBTI Type Pages — Phase 2+ Notes

> โดย Debbie · อัปเดต 2026-06-05

## ✅ เสร็จแล้ว
- **Phase 1** (commit `983ba2c`): render archetype content ครบทุก field + FAQ + FAQPage schema → 16 หน้า, 738→~2,600 ตัวอักษร
- **Phase 2** (commit `f1c46e8`): deep content layer (career + อาชีพไทยจริง, workplace, love+matrix, money, FAQ ขยาย)
  - data: `src/data/quiz-content/mbti-type-deep.json` (keyed by MBTI code)
  - INTJ = golden page (5,322 ตัวอักษร, H2=13, H3=11) → อนุมัติแล้ว
  - กำลัง scale อีก 15 type

---

## 📝 TODO: ภาพประกอบ (Phase 3 — ยังไม่เริ่ม, บอสขอ note ไว้)

บอสอยากได้ภาพประกอบเพิ่มในหน้า MBTI type — แนวทางที่เสนอ:

### 1. Mascot อยู่แล้ว (มีของเดิม)
- มี `<Mascot mbti={code} />` แมวประจำแต่ละ type ใน hero + navigator แล้ว → ใช้ต่อได้

### 2. ภาพที่ควรเพิ่ม (ต่อ section)
| Section | ไอเดียภาพ | สไตล์ |
|---|---|---|
| Hero | ภาพ archetype แมวตัวใหญ่ + accent color theme | brand sticker style (มีอยู่) |
| 💼 อาชีพ | infographic ไอคอนอาชีพ 8 แบบ / แมวในชุดอาชีพ | flat icon + brand palette |
| ❤️ ความรัก | compatibility wheel/matrix แสดง % เข้ากัน | diagram วงกลม MBTI |
| 🏢 workplace | แมว type ในออฟฟิศ (โต๊ะ Notion/มีตติ้ง) | illustration |
| FAQ/share | quote card สวยๆ สำหรับแชร์ IG story (มี shareable_quote อยู่แล้ว) | 1080×1920 template |

### 3. วิธีผลิต (เลือกได้)
- **A) AI image gen** (Higgsfield/image_generate) — แมว mascot ในบริบทต่างๆ, consistent style ต่อ type
- **B) SVG/CSS diagram** — compatibility wheel + career icons (เบา, โหลดเร็ว, ดีต่อ CWV)
- **C) OG share card generator** — มี `/og-default.svg` อยู่แล้ว → ขยายเป็น per-type quote card

### 4. ข้อควรระวัง
- CWV: ภาพต้อง lazy-load + WebP/AVIF + width/height กัน CLS
- alt text ต้องมี keyword (เช่น "INTJ นักวางแผนสายเย็นชา บุคลิกภาพ MBTI")
- consistency: ทุก type ต้องสไตล์เดียวกัน (ใช้ seed/style ref เดียว ถ้าใช้ AI)
- เริ่มจาก compatibility wheel (SVG) ก่อน = impact สูง + ดี SEO + ไม่กระทบ performance

### 5. ลำดับแนะนำ (เมื่อบอสพร้อม)
1. Compatibility wheel SVG (ทุก type, dynamic จาก best/worst/compatible)
2. Career icons row (8 ไอคอน reusable)
3. Per-type shareable quote card (OG generator ขยาย)
4. AI mascot illustrations (ทีหลังสุด — แพง + ต้องคุม consistency)
