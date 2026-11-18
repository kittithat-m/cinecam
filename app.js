/**
 * CineCam - Cinematic Film Photo Editor
 * Designed for Android / Samsung Galaxy & Desktop Browsers
 */

// Preset Definitions
const PRESETS = [
  {
    id: 'cinestill',
    name: 'CineStill 800T',
    subtitle: 'Movie Night',
    tag: 'MOVIE',
    desc: 'โทนเขียวมุก + ไฟส้มทังสเตนสไตล์หนัง แบบภาพ Carly Rae Jepsen',
    gradient: 'linear-gradient(135deg, #113328, #d97706)',
    settings: {
      exposure: -3,
      contrast: 18,
      sat: 8,
      temp: 24,
      shadowTint: 28,
      grain: 26,
      halation: 38,
      vignette: 35,
      aspect: '16-9',
      cinemaBars: false,
      titleEnabled: true,
      titleLeft: 'DAY AND NIGHT (CONTINUED)',
      titleRight: 'CARLY RAE JEPSEN',
      dateStamp: false
    }
  },
  {
    id: 'dazz_35mm',
    name: 'Dazz Classic',
    subtitle: 'Portra 400',
    tag: '35MM',
    desc: 'โทนฟิล์มคลาสสิก อบอุ่น ผิวนวล ละมุนตาสำหรับภาพทั่วไป',
    gradient: 'linear-gradient(135deg, #78350f, #d97706)',
    settings: {
      exposure: 2,
      contrast: 12,
      sat: 5,
      temp: 16,
      shadowTint: 8,
      grain: 22,
      halation: 18,
      vignette: 22,
      aspect: 'original',
      cinemaBars: false,
      titleEnabled: false,
      dateStamp: false
    }
  },
  {
    id: 'fuji_superia',
    name: 'Fuji Superia',
    subtitle: 'Emerald 400',
    tag: 'FUJI',
    desc: 'ฟิล์มฟูจิเอกลักษณ์ เงาเขียวอมฟ้าสดชื่น คอนทราสต์คม',
    gradient: 'linear-gradient(135deg, #064e3b, #0284c7)',
    settings: {
      exposure: 1,
      contrast: 15,
      sat: -4,
      temp: -8,
      shadowTint: 35,
      grain: 24,
      halation: 15,
      vignette: 20,
      aspect: 'original',
      cinemaBars: false,
      titleEnabled: false,
      dateStamp: false
    }
  },
  {
    id: 'ccd_y2k',
    name: 'CCD Y2K Glow',
    subtitle: 'Compact 2000s',
    tag: 'CCD',
    desc: 'โทนกล้องดิจิทัลยุคเก่า ยิงแฟลช ผิวขาวอมชมพูเรื่อ ๆ',
    gradient: 'linear-gradient(135deg, #374151, #f472b6)',
    settings: {
      exposure: 8,
      contrast: 22,
      sat: 2,
      temp: -4,
      shadowTint: -12,
      grain: 8,
      halation: 45,
      vignette: 15,
      aspect: '4-3',
      cinemaBars: false,
      titleEnabled: false,
      dateStamp: true
    }
  },
  {
    id: 'disposable_90s',
    name: '90s Disposable',
    subtitle: 'Flash & Date',
    tag: 'RETRO',
    desc: 'กล้องใช้แล้วทิ้ง สีสด แสงแฟลชจัดจ้าน พร้อมแสตมป์วันที่ส้ม',
    gradient: 'linear-gradient(135deg, #9a3412, #f59e0b)',
    settings: {
      exposure: 6,
      contrast: 25,
      sat: 18,
      temp: 20,
      shadowTint: 10,
      grain: 32,
      halation: 30,
      vignette: 40,
      aspect: 'original',
      cinemaBars: false,
      titleEnabled: false,
      dateStamp: true
    }
  },
  {
    id: 'noir_bw',
    name: 'Film Noir',
    subtitle: 'Cinematic B&W',
    tag: 'B&W',
    desc: 'ขาวดำฟิล์มภาพยนตร์ คอนทราสต์หนักแน่น เกรนเข้มขรึม',
    gradient: 'linear-gradient(135deg, #111827, #6b7280)',
    settings: {
      exposure: -4,
      contrast: 35,
      sat: -100, // Monochrome
      temp: 0,
      shadowTint: 0,
      grain: 38,
      halation: 25,
      vignette: 45,
      aspect: '21-9',
      cinemaBars: false,
      titleEnabled: true,
      titleLeft: 'SCENE 04 - THE RENDEZVOUS',
      titleRight: 'DIRECTOR CUT',
      dateStamp: false
    }
  }
];

// App State
const state = {
  originalImage: null,
  activePresetId: 'cinestill',
  isComparing: false,
  isRendering: false,

  // Settings
  exposure: -3,
  contrast: 18,
  sat: 8,
  temp: 24,
  shadowTint: 28,
  grain: 26,
  halation: 38,
  vignette: 35,

  // Framing
  aspect: '16-9',
  cinemaBars: false,
  cinemaBarsPercent: 8,

  // Title
  titleEnabled: true,
  titleLeft: 'DAY AND NIGHT (CONTINUED)',
  titleRight: 'CARLY RAE JEPSEN',
  fontFamily: 'Space Grotesk',
  fontSize: 18,
  fontOpacity: 90,
  fontPos: 20,

  // Date Stamp
  dateStamp: false,
  dateStampText: getFormattedDate()
};

function getFormattedDate() {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `'${yy} ${mm} ${dd}`;
}

// DOM Elements
const canvas = document.getElementById('previewCanvas');
const ctx = canvas.getContext('2d');
const emptyState = document.getElementById('emptyState');
const canvasWrapper = document.getElementById('canvasWrapper');
const floatingTools = document.getElementById('floatingTools');
const loaderOverlay = document.getElementById('loaderOverlay');
const comparisonBadge = document.getElementById('comparisonBadge');

const imageInput = document.getElementById('imageInput');
const imageInputMobile = document.getElementById('imageInputMobile');
const btnLoadSample = document.getElementById('btnLoadSample');
const btnCompare = document.getElementById('btnCompare');
const btnReset = document.getElementById('btnReset');
const btnExport = document.getElementById('btnExport');

// Sliders & Controls
const sliderGrain = document.getElementById('sliderGrain');
const sliderHalation = document.getElementById('sliderHalation');
const sliderVignette = document.getElementById('sliderVignette');
const sliderShadowTint = document.getElementById('sliderShadowTint');
const sliderTemp = document.getElementById('sliderTemp');
const sliderExposure = document.getElementById('sliderExposure');
const sliderContrast = document.getElementById('sliderContrast');
const sliderSat = document.getElementById('sliderSat');

// Value Labels
const grainVal = document.getElementById('grainVal');
const halationVal = document.getElementById('halationVal');
const vignetteVal = document.getElementById('vignetteVal');
const shadowTintVal = document.getElementById('shadowTintVal');
const tempVal = document.getElementById('tempVal');
const expVal = document.getElementById('expVal');
const contrastVal = document.getElementById('contrastVal');
const satVal = document.getElementById('satVal');

// Title Controls
const titleToggle = document.getElementById('titleToggle');
const titleControls = document.getElementById('titleControls');
const titleLeft = document.getElementById('titleLeft');
const titleRight = document.getElementById('titleRight');
const fontSelect = document.getElementById('fontSelect');
const fontSizeSlider = document.getElementById('fontSizeSlider');
const fontSizeVal = document.getElementById('fontSizeVal');
const fontOpacitySlider = document.getElementById('fontOpacitySlider');
const fontOpacityVal = document.getElementById('fontOpacityVal');
const fontPosSlider = document.getElementById('fontPosSlider');
const fontPosVal = document.getElementById('fontPosVal');

// Date Stamp Controls
const dateStampToggle = document.getElementById('dateStampToggle');
const dateStampControls = document.getElementById('dateStampControls');
const dateStampText = document.getElementById('dateStampText');

// Framing Controls
const aspectChips = document.getElementById('aspectChips');
const cinemaBarsToggle = document.getElementById('cinemaBarsToggle');
const cinemaBarsGroup = document.getElementById('cinemaBarsGroup');
const cinemaBarsSlider = document.getElementById('cinemaBarsSlider');
const cinemaBarsValue = document.getElementById('cinemaBarsValue');

// Off-screen canvas for rendering pipeline
const offCanvas = document.createElement('canvas');
const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });

// Initialize UI
function init() {
  buildPresetsGrid();
  attachEventListeners();
  syncControlsWithState();
}

// Build Presets Grid
function buildPresetsGrid() {
  const container = document.getElementById('presetsGrid');
  container.innerHTML = '';

  PRESETS.forEach(preset => {
    const card = document.createElement('div');
    card.className = `preset-card ${preset.id === state.activePresetId ? 'active' : ''}`;
    card.dataset.id = preset.id;

    card.innerHTML = `
      <div class="preset-swatch" style="background: ${preset.gradient}">
        <span class="preset-tag">${preset.tag}</span>
      </div>
      <div class="preset-name">${preset.name}</div>
      <div class="preset-desc">${preset.subtitle}</div>
    `;

    card.addEventListener('click', () => applyPreset(preset.id));
    container.appendChild(card);
  });
}

// Apply Preset
function applyPreset(presetId) {
  const preset = PRESETS.find(p => p.id === presetId);
  if (!preset) return;

  state.activePresetId = preset.id;
  Object.assign(state, preset.settings);

  document.querySelectorAll('.preset-card').forEach(c => {
    c.classList.toggle('active', c.dataset.id === presetId);
  });

  syncControlsWithState();
  scheduleRender();
}

// Sync UI inputs with current state
function syncControlsWithState() {
  // Sliders
  sliderGrain.value = state.grain;
  grainVal.textContent = `${state.grain}%`;

  sliderHalation.value = state.halation;
  halationVal.textContent = `${state.halation}%`;

  sliderVignette.value = state.vignette;
  vignetteVal.textContent = `${state.vignette}%`;

  sliderShadowTint.value = state.shadowTint;
  shadowTintVal.textContent = (state.shadowTint >= 0 ? '+' : '') + state.shadowTint;

  sliderTemp.value = state.temp;
  tempVal.textContent = (state.temp >= 0 ? '+' : '') + state.temp;

  sliderExposure.value = state.exposure;
  expVal.textContent = (state.exposure >= 0 ? '+' : '') + state.exposure;

  sliderContrast.value = state.contrast;
  contrastVal.textContent = (state.contrast >= 0 ? '+' : '') + state.contrast;

  sliderSat.value = state.sat;
  satVal.textContent = (state.sat >= 0 ? '+' : '') + state.sat;

  // Aspect Chips
  document.querySelectorAll('.aspect-chips .chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.aspect === state.aspect);
  });

  // Cinema Bars
  cinemaBarsToggle.checked = state.cinemaBars;
  cinemaBarsGroup.classList.toggle('hidden', !state.cinemaBars);
  cinemaBarsSlider.value = state.cinemaBarsPercent;
  cinemaBarsValue.textContent = `${state.cinemaBarsPercent}%`;

  // Title Controls
  titleToggle.checked = state.titleEnabled;
  titleControls.classList.toggle('hidden', !state.titleEnabled);
  titleLeft.value = state.titleLeft;
  titleRight.value = state.titleRight;
  fontSelect.value = state.fontFamily;
  fontSizeSlider.value = state.fontSize;
  fontSizeVal.textContent = `${state.fontSize}px`;
  fontOpacitySlider.value = state.fontOpacity;
  fontOpacityVal.textContent = `${state.fontOpacity}%`;
  fontPosSlider.value = state.fontPos;
  fontPosVal.textContent = `${state.fontPos}%`;

  // Date Stamp
  dateStampToggle.checked = state.dateStamp;
  dateStampControls.classList.toggle('hidden', !state.dateStamp);
  dateStampText.value = state.dateStampText;
}

// Event Listeners
function attachEventListeners() {
  // Tab Switcher
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
    });
  });

  // File Upload
  imageInput.addEventListener('change', handleFileSelect);
  imageInputMobile.addEventListener('change', handleFileSelect);

  // Sample Image Load
  btnLoadSample.addEventListener('click', () => loadSampleImage('sample.jpg'));

  // Slider adjustments
  setupSlider(sliderGrain, grainVal, '%', v => state.grain = +v);
  setupSlider(sliderHalation, halationVal, '%', v => state.halation = +v);
  setupSlider(sliderVignette, vignetteVal, '%', v => state.vignette = +v);
  setupSlider(sliderShadowTint, shadowTintVal, '', v => state.shadowTint = +v, true);
  setupSlider(sliderTemp, tempVal, '', v => state.temp = +v, true);
  setupSlider(sliderExposure, expVal, '', v => state.exposure = +v, true);
  setupSlider(sliderContrast, contrastVal, '', v => state.contrast = +v, true);
  setupSlider(sliderSat, satVal, '', v => state.sat = +v, true);

  // Aspect Ratio
  aspectChips.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    state.aspect = chip.dataset.aspect;
    document.querySelectorAll('.aspect-chips .chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    scheduleRender();
  });

  // Cinema Bars Toggle & Slider
  cinemaBarsToggle.addEventListener('change', e => {
    state.cinemaBars = e.target.checked;
    cinemaBarsGroup.classList.toggle('hidden', !state.cinemaBars);
    scheduleRender();
  });

  cinemaBarsSlider.addEventListener('input', e => {
    state.cinemaBarsPercent = +e.target.value;
    cinemaBarsValue.textContent = `${state.cinemaBarsPercent}%`;
    scheduleRender();
  });

  // Title controls
  titleToggle.addEventListener('change', e => {
    state.titleEnabled = e.target.checked;
    titleControls.classList.toggle('hidden', !state.titleEnabled);
    scheduleRender();
  });

  titleLeft.addEventListener('input', e => {
    state.titleLeft = e.target.value;
    scheduleRender();
  });

  titleRight.addEventListener('input', e => {
    state.titleRight = e.target.value;
    scheduleRender();
  });

  fontSelect.addEventListener('change', e => {
    state.fontFamily = e.target.value;
    scheduleRender();
  });

  setupSlider(fontSizeSlider, fontSizeVal, 'px', v => state.fontSize = +v);
  setupSlider(fontOpacitySlider, fontOpacityVal, '%', v => state.fontOpacity = +v);
  setupSlider(fontPosSlider, fontPosVal, '%', v => state.fontPos = +v);

  // Date Stamp
  dateStampToggle.addEventListener('change', e => {
    state.dateStamp = e.target.checked;
    dateStampControls.classList.toggle('hidden', !state.dateStamp);
    scheduleRender();
  });

  dateStampText.addEventListener('input', e => {
    state.dateStampText = e.target.value;
    scheduleRender();
  });

  // Compare original button (press and hold or mouse down)
  btnCompare.addEventListener('mousedown', startCompare);
  btnCompare.addEventListener('mouseup', endCompare);
  btnCompare.addEventListener('mouseleave', endCompare);
  btnCompare.addEventListener('touchstart', (e) => { e.preventDefault(); startCompare(); });
  btnCompare.addEventListener('touchend', endCompare);

  // Reset button
  btnReset.addEventListener('click', () => {
    if (confirm('ต้องการรีเซ็ตค่าทั้งหมดกลับเป็นค่าเริ่มต้นของพรีเซ็ตใช่หรือไม่?')) {
      applyPreset(state.activePresetId);
    }
  });

  // Export / Download High-Res
  btnExport.addEventListener('click', exportHighResImage);
}

function setupSlider(slider, labelElem, suffix, updateFn, showSign = false) {
  slider.addEventListener('input', e => {
    const val = +e.target.value;
    updateFn(val);
    labelElem.textContent = (showSign && val > 0 ? '+' : '') + val + suffix;
    state.activePresetId = 'custom';
    document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
    scheduleRender();
  });
}

function startCompare() {
  if (!state.originalImage) return;
  state.isComparing = true;
  comparisonBadge.classList.remove('hidden');
  renderOriginal();
}

function endCompare() {
  if (!state.originalImage || !state.isComparing) return;
  state.isComparing = false;
  comparisonBadge.classList.add('hidden');
  scheduleRender();
}

// File Selection Handler
function handleFileSelect(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = ev => {
    loadImageFromSrc(ev.target.result);
  };
  reader.readAsDataURL(file);
}

function loadSampleImage(url) {
  loadImageFromSrc(url);
}

function loadImageFromSrc(src) {
  loaderOverlay.classList.remove('hidden');
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    state.originalImage = img;
    emptyState.classList.add('hidden');
    canvasWrapper.classList.remove('hidden');
    floatingTools.classList.remove('hidden');

    btnCompare.disabled = false;
    btnReset.disabled = false;
    btnExport.disabled = false;

    loaderOverlay.classList.add('hidden');
    scheduleRender();
  };
  img.onerror = () => {
    loaderOverlay.classList.add('hidden');
    alert('ไม่สามารถโหลดรูปภาพได้ กรุณาลองเลือกรูปภาพอื่น');
  };
  img.src = src;
}

// Debounced render scheduler for 60fps responsiveness
let renderTimeout = null;
function scheduleRender() {
  if (!state.originalImage || state.isComparing) return;
  if (renderTimeout) cancelAnimationFrame(renderTimeout);
  renderTimeout = requestAnimationFrame(() => renderPipeline(canvas, ctx, false));
}

/**
 * Main Rendering Engine:
 * Handles Crop, Color Matrix, Tungsten warmth, Green Shadows,
 * Halation Bloom, Film Grain, Letterbox, and Movie Titles
 */
function renderPipeline(targetCanvas, targetCtx, isHighRes = false) {
  if (!state.originalImage) return;

  const srcImg = state.originalImage;
  const origW = srcImg.naturalWidth || srcImg.width;
  const origH = srcImg.naturalHeight || srcImg.height;

  // 1. Calculate Crop Box based on Aspect Ratio
  let targetRatio = origW / origH;
  switch (state.aspect) {
    case '16-9': targetRatio = 16 / 9; break;
    case '21-9': targetRatio = 2.39 / 1; break;
    case '4-3': targetRatio = 4 / 3; break;
    case '1-1': targetRatio = 1 / 1; break;
    case '9-16': targetRatio = 9 / 16; break;
    case 'original': default: targetRatio = origW / origH; break;
  }

  let cropW = origW;
  let cropH = origH;
  if (origW / origH > targetRatio) {
    cropW = origH * targetRatio;
  } else {
    cropH = origW / targetRatio;
  }
  const cropX = (origW - cropW) / 2;
  const cropY = (origH - cropH) / 2;

  // 2. Set Target Canvas Dimensions
  let destW = cropW;
  let destH = cropH;

  // For real-time viewport preview, limit max dimension to 1400px for buttery smooth 60fps
  if (!isHighRes) {
    const maxDim = 1400;
    if (destW > maxDim || destH > maxDim) {
      if (destW > destH) {
        destH = Math.round((destH / destW) * maxDim);
        destW = maxDim;
      } else {
        destW = Math.round((destW / destH) * maxDim);
        destH = maxDim;
      }
    }
  }

  targetCanvas.width = destW;
  targetCanvas.height = destH;

  // 3. Draw cropped base image onto offscreen canvas for pixel analysis
  offCanvas.width = destW;
  offCanvas.height = destH;
  offCtx.drawImage(srcImg, cropX, cropY, cropW, cropH, 0, 0, destW, destH);

  const imgData = offCtx.getImageData(0, 0, destW, destH);
  const data = imgData.data;

  // Cache adjustment values
  const expFactor = 1 + (state.exposure / 50);
  const contrastFactor = (259 * (state.contrast + 255)) / (255 * (259 - state.contrast));
  const tempShift = state.temp; // Warm tungsten (+Red, -Blue)
  const shadowGreenShift = state.shadowTint; // Emerald shadow (+Green in dark areas)
  const satFactor = 1 + (state.sat / 50);
  const isMonochrome = state.sat <= -95;

  // 4. Pixel-level Color Grading (Tungsten Warmth + Deep Green Shadows + Contrast)
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];

    // Exposure
    r *= expFactor;
    g *= expFactor;
    b *= expFactor;

    // Contrast
    r = contrastFactor * (r - 128) + 128;
    g = contrastFactor * (g - 128) + 128;
    b = contrastFactor * (b - 128) + 128;

    // Luminance for Split Toning
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const shadowWeight = Math.max(0, 1 - (lum / 180)); // higher in shadows
    const highlightWeight = Math.min(1, lum / 160);    // higher in highlights

    // Warm Tungsten in Highlights / Mids
    r += tempShift * 0.8 * highlightWeight;
    b -= tempShift * 0.6 * highlightWeight;

    // Emerald / Green Tint in Shadows (CineStill signature)
    g += shadowGreenShift * 0.85 * shadowWeight;
    b += shadowGreenShift * 0.25 * shadowWeight;
    r -= shadowGreenShift * 0.3 * shadowWeight;

    // Saturation
    if (isMonochrome) {
      r = g = b = lum;
    } else if (satFactor !== 1) {
      r = lum + satFactor * (r - lum);
      g = lum + satFactor * (g - lum);
      b = lum + satFactor * (b - lum);
    }

    // Clamp values [0, 255]
    data[i] = r < 0 ? 0 : r > 255 ? 255 : r;
    data[i + 1] = g < 0 ? 0 : g > 255 ? 255 : g;
    data[i + 2] = b < 0 ? 0 : b > 255 ? 255 : b;
  }

  offCtx.putImageData(imgData, 0, 0);

  // 5. Draw Processed Image to Target
  targetCtx.clearRect(0, 0, destW, destH);
  targetCtx.drawImage(offCanvas, 0, 0);

  // 6. Halation / Bloom Effect (Warm Glow on Highlights)
  if (state.halation > 0) {
    applyHalation(targetCtx, destW, destH, state.halation);
  }

  // 7. Organic Film Grain
  if (state.grain > 0) {
    applyFilmGrain(targetCtx, destW, destH, state.grain);
  }

  // 8. Vignette
  if (state.vignette > 0) {
    applyVignette(targetCtx, destW, destH, state.vignette);
  }

  // 9. Cinema Letterbox Bars
  if (state.cinemaBars) {
    const barHeight = destH * (state.cinemaBarsPercent / 100);
    targetCtx.fillStyle = '#05070a';
    targetCtx.fillRect(0, 0, destW, barHeight);
    targetCtx.fillRect(0, destH - barHeight, destW, barHeight);
  }

  // 10. Movie Title Overlay (White cinema typography)
  if (state.titleEnabled) {
    renderMovieTitles(targetCtx, destW, destH);
  }

  // 11. Retro Date Stamp (Dazz orange LED style)
  if (state.dateStamp) {
    renderDateStamp(targetCtx, destW, destH);
  }
}

// Render Original (For comparison button)
function renderOriginal() {
  if (!state.originalImage) return;
  const srcImg = state.originalImage;
  const origW = srcImg.naturalWidth || srcImg.width;
  const origH = srcImg.naturalHeight || srcImg.height;

  canvas.width = origW;
  canvas.height = origH;
  ctx.drawImage(srcImg, 0, 0);
}

// Halation Bloom (CineStill signature red-orange aura around bright lights)
function applyHalation(targetCtx, width, height, intensity) {
  const bloomCanvas = document.createElement('canvas');
  const bScale = 0.25; // small for soft blur
  bloomCanvas.width = Math.max(1, Math.floor(width * bScale));
  bloomCanvas.height = Math.max(1, Math.floor(height * bScale));
  const bCtx = bloomCanvas.getContext('2d');

  // Extract highlights
  bCtx.drawImage(targetCtx.canvas, 0, 0, bloomCanvas.width, bloomCanvas.height);
  const bImg = bCtx.getImageData(0, 0, bloomCanvas.width, bloomCanvas.height);
  const d = bImg.data;

  for (let i = 0; i < d.length; i += 4) {
    const lum = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
    if (lum > 175) {
      // Warm golden/amber halation color
      d[i] = Math.min(255, d[i] * 1.3);
      d[i + 1] = d[i + 1] * 0.85;
      d[i + 2] = d[i + 2] * 0.5;
    } else {
      d[i] = d[i + 1] = d[i + 2] = 0;
    }
  }
  bCtx.putImageData(bImg, 0, 0);

  // Blend bloom over original with 'screen'
  targetCtx.save();
  targetCtx.globalAlpha = (intensity / 100) * 0.85;
  targetCtx.globalCompositeOperation = 'screen';
  targetCtx.filter = `blur(${Math.max(4, width * 0.02)}px)`;
  targetCtx.drawImage(bloomCanvas, 0, 0, width, height);
  targetCtx.restore();
}

// Realistic Organic Film Grain
function applyFilmGrain(targetCtx, width, height, amount) {
  const grainCanvas = document.createElement('canvas');
  const gW = Math.min(600, width);
  const gH = Math.min(600, height);
  grainCanvas.width = gW;
  grainCanvas.height = gH;
  const gCtx = grainCanvas.getContext('2d');

  const gImg = gCtx.createImageData(gW, gH);
  const gData = gImg.data;

  const alpha = (amount / 100) * 0.35;
  for (let i = 0; i < gData.length; i += 4) {
    const noise = (Math.random() - 0.5) * 255;
    gData[i] = 128 + noise;
    gData[i + 1] = 128 + noise;
    gData[i + 2] = 128 + noise;
    gData[i + 3] = 255;
  }
  gCtx.putImageData(gImg, 0, 0);

  targetCtx.save();
  targetCtx.globalAlpha = alpha;
  targetCtx.globalCompositeOperation = 'overlay';

  // Tile grain over canvas
  const pattern = targetCtx.createPattern(grainCanvas, 'repeat');
  targetCtx.fillStyle = pattern;
  targetCtx.fillRect(0, 0, width, height);
  targetCtx.restore();
}

// Radial Vignette
function applyVignette(targetCtx, width, height, strength) {
  targetCtx.save();
  const radius = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
  const gradient = targetCtx.createRadialGradient(
    width / 2, height / 2, radius * 0.35,
    width / 2, height / 2, radius
  );

  const opacity = (strength / 100) * 0.75;
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  gradient.addColorStop(0.7, `rgba(4, 7, 10, ${opacity * 0.5})`);
  gradient.addColorStop(1, `rgba(2, 4, 6, ${opacity})`);

  targetCtx.fillStyle = gradient;
  targetCtx.fillRect(0, 0, width, height);
  targetCtx.restore();
}

// Movie Titles Overlay (Exact match to Carly Rae Jepsen reference)
function renderMovieTitles(targetCtx, width, height) {
  targetCtx.save();

  // Scale font size proportionally to image resolution
  const baseScale = width / 1200;
  const scaledFontSize = Math.max(11, Math.round(state.fontSize * baseScale));
  const topPos = height * (state.fontPos / 100);
  const sideMargin = Math.round(width * 0.08);

  targetCtx.font = `700 ${scaledFontSize}px '${state.fontFamily}', -apple-system, sans-serif`;
  targetCtx.fillStyle = `rgba(245, 247, 250, ${state.fontOpacity / 100})`;
  targetCtx.textBaseline = 'top';

  // Slight subtle drop shadow for readability against bright backgrounds
  targetCtx.shadowColor = 'rgba(0, 0, 0, 0.6)';
  targetCtx.shadowBlur = 4 * baseScale;
  targetCtx.shadowOffsetX = 1 * baseScale;
  targetCtx.shadowOffsetY = 1 * baseScale;

  // Left Title (e.g. DAY AND NIGHT (CONTINUED))
  if (state.titleLeft && state.titleLeft.trim()) {
    targetCtx.textAlign = 'left';
    targetCtx.fillText(state.titleLeft.toUpperCase(), sideMargin, topPos);
  }

  // Right Title (e.g. CARLY RAE JEPSEN)
  if (state.titleRight && state.titleRight.trim()) {
    targetCtx.textAlign = 'right';
    targetCtx.fillText(state.titleRight.toUpperCase(), width - sideMargin, topPos);
  }

  targetCtx.restore();
}

// Retro Orange Date Stamp
function renderDateStamp(targetCtx, width, height) {
  if (!state.dateStampText) return;
  targetCtx.save();

  const baseScale = width / 1200;
  const fontSize = Math.max(14, Math.round(26 * baseScale));
  const rightMargin = Math.round(width * 0.06);
  const bottomMargin = Math.round(height * 0.06);

  targetCtx.font = `700 ${fontSize}px 'VT323', monospace`;
  targetCtx.textAlign = 'right';
  targetCtx.textBaseline = 'bottom';

  // Iconic orange LED glow
  targetCtx.shadowColor = 'rgba(249, 115, 22, 0.8)';
  targetCtx.shadowBlur = 6 * baseScale;
  targetCtx.fillStyle = '#ff7b1a';

  targetCtx.fillText(state.dateStampText, width - rightMargin, height - bottomMargin);
  targetCtx.restore();
}

// High-Resolution Export
function exportHighResImage() {
  if (!state.originalImage) return;

  loaderOverlay.classList.remove('hidden');
  const loaderText = loaderOverlay.querySelector('span');
  if (loaderText) loaderText.textContent = 'กำลังเรนเดอร์ภาพความละเอียดสูง...';

  setTimeout(() => {
    try {
      const exportCanvas = document.createElement('canvas');
      const exportCtx = exportCanvas.getContext('2d');

      // Render at 100% full resolution
      renderPipeline(exportCanvas, exportCtx, true);

      // Trigger download
      exportCanvas.toBlob(blob => {
        loaderOverlay.classList.add('hidden');
        if (loaderText) loaderText.textContent = 'กำลังประมวลผล...';

        if (!blob) {
          alert('เกิดข้อผิดพลาดในการบันทึกรูป');
          return;
        }

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const filename = `CineCam_${state.activePresetId}_${Date.now()}.jpg`;
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 'image/jpeg', 0.95);
    } catch (err) {
      console.error(err);
      loaderOverlay.classList.add('hidden');
      alert('เกิดข้อผิดพลาด: ' + err.message);
    }
  }, 50);
}

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(err => {
      console.log('SW registration note:', err);
    });
  });
}

// Auto-run
window.addEventListener('DOMContentLoaded', init);
