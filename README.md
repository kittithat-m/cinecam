# 🎬 CineCam - Cinematic Film Photo Editor

เว็บแอปแต่งภาพโทนกล้องฟิล์มและสไตล์ภาพยนตร์ 35mm (สไตล์ Dazz Cam / CineStill 800T) ออกแบบมาให้ทำงานได้อย่างลื่นไหลทั้งบนมือถือ **Samsung Galaxy (Android)** และคอมพิวเตอร์ รองรับ **PWA (Progressive Web App)** สามารถติดตั้งเป็นแอปบนหน้าจอมือถือได้โดยไม่ต้องผ่าน Play Store และโฮสต์บน **GitHub Pages** ได้ฟรี 100%

---

## ✨ ฟีเจอร์เด่น (Key Features)

1. **พรีเซ็ตฟิล์มและภาพยนตร์ยอดนิยม**:
   - 🎬 **CineStill 800T (Movie Night)**: ดึงเงาเขียวมุก (Emerald Green) ตัดกับแสงส้มทังสเตน (Warm Tungsten) พร้อมแสงไฟฟุ้งแบบฉากภาพยนตร์ (โทนเดียวกับภาพ Carly Rae Jepsen)
   - 🎞️ **Dazz Classic (Portra 400)**: โทนฟิล์มคลาสสิก อบอุ่น ผิวนวล ละมุนตา
   - 🌿 **Fuji Superia (Emerald 400)**: ฟิล์มฟูจิสีเขียวสดใส คอนทราสต์คม
   - 📸 **CCD Y2K Glow**: โทนกล้องดิจิทัลคอมแพคยุค 2000s ผิวขาวอมชมพูเรื่อ
   - ⚡ **90s Disposable**: กล้องใช้แล้วทิ้ง สีสันสดชัด แฟลชสว่าง และแสตมป์วันที่สีส้ม
   - 🖤 **Film Noir (B&W)**: ขาวดำฟิล์มหนัง คอนทราสต์ลึก เกรนเข้มขรึม
2. **เอฟเฟกต์ระดับโปร**:
   - **Halation / Bloom**: แสงไฟฟุ้งสีทอง/ส้มเรื่อรอบไฮไลท์ เอกลักษณ์ของฟิล์มหนัง 35mm
   - **Organic Film Grain**: เกรนฟิล์มธรรมชาติ ละเอียด ไม่แตกหยาบ
   - **Split Toning**: ปรับแยกสีย้อมเงา (Shadow Tint) และอุณหภูมิแสง (Temperature) ได้อย่างอิสระ
   - **Vignette**: ขอบมืดช่วยดึงสายตาเข้าสู่จุดเด่น
3. **จัดสัดส่วนภาพยนตร์ & ใส่ไตเติล**:
   - สัดส่วน **16:9 (Cinema)**, **2.39:1 (Cinemascope)**, **4:3 (Vintage)**, **1:1**, **9:16 (Story)**
   - **Movie Titles**: ใส่ชื่อเรื่อง/ไตเติลหนังมุมซ้าย-ขวา เช่น `DAY AND NIGHT (CONTINUED)`
   - **Retro Date Stamp**: แสตมป์วันที่เรโทรสีส้มสไตล์กล้องฟิล์ม 90s
   - **ปุ่มเทียบต้นฉบับ**: แตะค้างเพื่อดูภาพก่อนแต่งได้ทันที
4. **ความละเอียดสูงสุด (High-Res Export)**:
   - บันทึกไฟล์ภาพคมชัดตามความละเอียดจริงของต้นฉบับ ไม่ลดคุณภาพภาพ

---

## 🚀 วิธีนำขึ้น GitHub และเปิดใช้งาน GitHub Pages

### ขั้นตอนที่ 1: สร้าง Repository บน GitHub
1. เข้าไปที่ [github.com](https://github.com) แล้วล็อกอิน
2. กดปุ่ม **`New`** เพื่อสร้าง Repository ใหม่
3. ตั้งชื่อ Repository เช่น `cinecam` หรือ `my-film-app`
4. ตั้งค่าเป็น **Public** แล้วกด **Create repository**

### ขั้นตอนที่ 2: อัปโหลดโค้ดขึ้น GitHub
เปิด Terminal / PowerShell ในโฟลเดอร์นี้ แล้วรันคำสั่ง:

```bash
git init
git add .
git commit -m "Initial release of CineCam"
git branch -M main
git remote add origin https://github.com/<ชื่อผู้ใช้GitHubของคุณ>/<ชื่อRepoของคุณ>.git
git push -u origin main
```
*(เปลี่ยน `<ชื่อผู้ใช้GitHubของคุณ>` และ `<ชื่อRepoของคุณ>` ให้ตรงกับบัญชีของคุณ)*

### ขั้นตอนที่ 3: เปิดใช้งาน GitHub Pages
1. ในหน้า Repository ของคุณบน GitHub ให้ไปที่แท็บ **Settings** (รูปฟันเฟืองด้านบน)
2. เลื่อนเมนูด้านซ้ายไปที่หัวข้อ **Pages**
3. ตรงส่วน **Build and deployment > Branch**:
   - เลือก Branch เป็น **`main`**
   - โฟลเดอร์เป็น **`/(root)`**
4. กดปุ่ม **Save**
5. รอประมาณ 1-2 นาที คุณจะได้ลิงก์เว็บไซต์ เช่น:
   👉 `https://<ชื่อผู้ใช้GitHubของคุณ>.github.io/<ชื่อRepoของคุณ>/`

---

## 📱 วิธีติดตั้งเป็นแอปลงบน Samsung Galaxy A57 5G

เมื่อคุณเปิดลิงก์ GitHub Pages บนมือถือ Samsung:

### บน Samsung Internet:
1. เปิดลิงก์เว็บแอปบน Samsung Internet
2. แตะที่ **ไอคอนขีดสามขีด (≡)** ที่มุมขวาล่าง
3. เลือก **"เพิ่มหน้าไปยัง" (Add page to)** > เลือก **"หน้าจอหลัก" (Home screen)** หรือ **"หน้าจอแอป" (App screen)**
4. ไอคอน CineCam จะไปอยู่ที่หน้าจอมือถือของคุณทันที และเมื่อเปิดใช้งาน จะแสดงผลแบบเต็มหน้าจอ (Full-screen) เหมือนแอปจริง ไม่มีแถบ URL มากวนใจ!

### บน Google Chrome (Android):
1. เปิดลิงก์เว็บแอปบน Chrome
2. แตะที่ **จุดสามจุด (⋮)** มุมขวาบน
3. เลือก **"ติดตั้งแอป" (Install app)** หรือ **"เพิ่มลงในหน้าจอหลัก" (Add to Home screen)**

---

## 💻 วิธีทดลองรันดูบนเครื่องคอมพิวเตอร์

คุณสามารถดับเบิลคลิกเปิดไฟล์ `index.html` บนเบราว์เซอร์ได้โดยตรง หรือเปิดผ่าน Local Web Server:

```bash
# ใช้ npx serve
npx serve .

# หรือใช้ Python
python -m http.server 8000
```
แล้วเปิดเบราว์เซอร์ไปที่ `http://localhost:8000`
