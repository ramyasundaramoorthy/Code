// Named colors for color identification
const namedColors = {
  black: [0, 0, 0],
  white: [255, 255, 255],
  red: [255, 0, 0],
  green: [0, 128, 0],
  blue: [0, 0, 255],
  yellow: [255, 255, 0],
  gray: [128, 128, 128],
  orange: [255, 165, 0],
  pink: [255, 192, 203],
  brown: [165, 42, 42],
  purple: [128, 0, 128],
  cyan: [0, 255, 255],
  magenta: [255, 0, 255],
  lime: [0, 255, 0],
  navy: [0, 0, 128],
  maroon: [128, 0, 0],
  olive: [128, 128, 0],
  teal: [0, 128, 128],
  silver: [192, 192, 192],
  gold: [255, 215, 0],
  beige: [245, 245, 220],
  coral: [255, 127, 80],
  indigo: [75, 0, 130],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  salmon: [250, 128, 114],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  sky: [135, 206, 235],
  forest: [34, 139, 34],
  crimson: [220, 20, 60],
  mint: [189, 252, 201],
  peach: [255, 218, 185]
};

// AI Object Detection Database (Simulated)
const objectDatabase = {
  // Objects defined by color patterns and characteristics
  apple: {
    colors: [[255, 0, 0], [255, 100, 100], [200, 50, 50], [139, 69, 19]],
    shapes: ['circular', 'oval'],
    keywords: ['fruit', 'red', 'round'],
    confidence: 0.85
  },
  banana: {
    colors: [[255, 255, 0], [255, 215, 0], [255, 255, 100], [240, 230, 140]],
    shapes: ['elongated', 'curved'],
    keywords: ['fruit', 'yellow', 'curved'],
    confidence: 0.90
  },
  orange: {
    colors: [[255, 165, 0], [255, 140, 0], [255, 69, 0], [255, 215, 0]],
    shapes: ['circular', 'spherical'],
    keywords: ['fruit', 'orange', 'citrus'],
    confidence: 0.88
  },
  leaf: {
    colors: [[0, 128, 0], [34, 139, 34], [0, 255, 0], [124, 252, 0]],
    shapes: ['oval', 'pointed'],
    keywords: ['nature', 'green', 'plant'],
    confidence: 0.75
  },
  sky: {
    colors: [[135, 206, 235], [0, 191, 255], [173, 216, 230], [176, 224, 230]],
    shapes: ['background', 'large_area'],
    keywords: ['blue', 'sky', 'background'],
    confidence: 0.70
  },
  grass: {
    colors: [[0, 128, 0], [34, 139, 34], [50, 205, 50], [144, 238, 144]],
    shapes: ['textured', 'ground'],
    keywords: ['green', 'grass', 'ground'],
    confidence: 0.65
  },
  flower: {
    colors: [[255, 192, 203], [255, 20, 147], [255, 105, 180], [255, 182, 193]],
    shapes: ['circular', 'petaled'],
    keywords: ['flower', 'pink', 'nature'],
    confidence: 0.80
  },
  car: {
    colors: [[128, 128, 128], [192, 192, 192], [0, 0, 0], [255, 0, 0]],
    shapes: ['rectangular', 'vehicle'],
    keywords: ['vehicle', 'transportation', 'car'],
    confidence: 0.85
  },
  tree: {
    colors: [[139, 69, 19], [160, 82, 45], [0, 128, 0], [34, 139, 34]],
    shapes: ['tall', 'branched'],
    keywords: ['tree', 'brown', 'green', 'nature'],
    confidence: 0.75
  },
  water: {
    colors: [[0, 0, 255], [30, 144, 255], [0, 191, 255], [173, 216, 230]],
    shapes: ['flowing', 'reflective'],
    keywords: ['water', 'blue', 'liquid'],
    confidence: 0.70
  }
};

// Global variables
let canvas, ctx, originalImageData, currentFilter = 'none', currentMode = 'simulation';
let detectedObjects = [];
let aiDetectionEnabled = true;

let settings = {
  theme: 'light',
  language: 'en',
  textSize: 'medium'
};

let userProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://via.placeholder.com/80x80/4a90e2/ffffff?text=JD'
};

// Enhanced language translations
const translations = {
  en: {
    'app_title': 'TrueHue',
    'welcome_message': 'Welcome to the Color Blindness Enhancement App!',
    'settings': 'Settings',
    'theme_label': 'Theme:',
    'language_label': 'Language:',
    'text_size_label': 'Text Size:',
    'light_mode': 'Light Mode',
    'dark_mode': 'Dark Mode',
    'small': 'Small',
    'medium': 'Medium',
    'large': 'Large',
    'upload_image': 'Upload Image',
    'download_image': 'Download Image',
    'analyze_image': 'Analyze Objects',
    'simulation_mode': 'Simulation Mode',
    'enhancement_mode': 'Enhancement Mode',
    'original': 'Original',
    'red_deficiency': 'Red Deficiency',
    'green_deficiency': 'Green Deficiency',
    'blue_deficiency': 'Blue Deficiency',
    'reset': 'Reset',
    'clear_analysis': 'Clear Analysis',
    'logout': 'Logout',
    'color_info_initial': 'Upload an image and click on it to see color information here.',
    'edit_profile': 'Edit Profile',
    'name_label': 'Name:',
    'email_label': 'Email:',
    'avatar_label': 'Avatar:',
    'save': 'Save',
    'cancel': 'Cancel',
    'ai_detection': 'AI Object Detection',
    'detected_objects': 'Detected Objects',
    'welcome_upload': 'Welcome! Upload an image to get started.',
    'image_loaded': 'Image loaded successfully!',
    'image_reset': 'Image reset to original.',
    'no_image_reset': 'No image to reset.',
    'invalid_file': 'Please select a valid image file.',
    'invalid_drop': 'Please drop a valid image file.',
    'profile_updated': 'Profile updated successfully!',
    'download_success': 'Image downloaded successfully!',
    'no_image_download': 'No image to download.',
    'analyzing_objects': 'Analyzing objects in the image...',
    'analysis_complete': 'Object analysis complete!',
    'no_objects_found': 'No distinct objects detected in this image.',
    'objects_detected': 'objects detected',
    'confidence': 'Confidence'
  },
  fr: {
    'app_title': 'TrueHue',
    'welcome_message': 'Bienvenue dans l\'application d\'amélioration du daltonisme!',
    'settings': 'Paramètres',
    'theme_label': 'Thème:',
    'language_label': 'Langue:',
    'text_size_label': 'Taille du Texte:',
    'light_mode': 'Mode Clair',
    'dark_mode': 'Mode Sombre',
    'small': 'Petit',
    'medium': 'Moyen',
    'large': 'Grand',
    'upload_image': 'Télécharger Image',
    'download_image': 'Télécharger Image',
    'analyze_image': 'Analyser Objets',
    'simulation_mode': 'Mode Simulation',
    'enhancement_mode': 'Mode Amélioration',
    'original': 'Original',
    'red_deficiency': 'Déficience Rouge',
    'green_deficiency': 'Déficience Verte',
    'blue_deficiency': 'Déficience Bleue',
    'reset': 'Réinitialiser',
    'clear_analysis': 'Effacer Analyse',
    'logout': 'Déconnexion',
    'color_info_initial': 'Téléchargez une image et cliquez dessus pour voir les informations de couleur ici.',
    'edit_profile': 'Modifier le Profil',
    'name_label': 'Nom:',
    'email_label': 'Email:',
    'avatar_label': 'Avatar:',
    'save': 'Enregistrer',
    'cancel': 'Annuler',
    'ai_detection': 'Détection IA d\'Objets',
    'detected_objects': 'Objets Détectés',
    'welcome_upload': 'Bienvenue! Téléchargez une image pour commencer.',
    'image_loaded': 'Image chargée avec succès!',
    'image_reset': 'Image remise à l\'original.',
    'no_image_reset': 'Aucune image à réinitialiser.',
    'invalid_file': 'Veuillez sélectionner un fichier image valide.',
    'invalid_drop': 'Veuillez déposer un fichier image valide.',
    'profile_updated': 'Profil mis à jour avec succès!',
    'download_success': 'Image téléchargée avec succès!',
    'no_image_download': 'Aucune image à télécharger.',
    'analyzing_objects': 'Analyse des objets dans l\'image...',
    'analysis_complete': 'Analyse d\'objets terminée!',
    'no_objects_found': 'Aucun objet distinct détecté dans cette image.',
    'objects_detected': 'objets détectés',
    'confidence': 'Confiance'
  },
  es: {
    'app_title': 'TrueHue',
    'welcome_message': '¡Bienvenido a la Aplicación de Mejora para Daltonismo!',
    'settings': 'Configuración',
    'theme_label': 'Tema:',
    'language_label': 'Idioma:',
    'text_size_label': 'Tamaño de Texto:',
    'light_mode': 'Modo Claro',
    'dark_mode': 'Modo Oscuro',
    'small': 'Pequeño',
    'medium': 'Mediano',
    'large': 'Grande',
    'upload_image': 'Subir Imagen',
    'download_image': 'Descargar Imagen',
    'analyze_image': 'Analizar Objetos',
    'simulation_mode': 'Modo Simulación',
    'enhancement_mode': 'Modo Mejora',
    'original': 'Original',
    'red_deficiency': 'Deficiencia Roja',
    'green_deficiency': 'Deficiencia Verde',
    'blue_deficiency': 'Deficiencia Azul',
    'reset': 'Reiniciar',
    'clear_analysis': 'Limpiar Análisis',
    'logout': 'Cerrar Sesión',
    'color_info_initial': 'Sube una imagen y haz clic en ella para ver la información de color aquí.',
    'edit_profile': 'Editar Perfil',
    'name_label': 'Nombre:',
    'email_label': 'Email:',
    'avatar_label': 'Avatar:',
    'save': 'Guardar',
    'cancel': 'Cancelar',
    'ai_detection': 'Detección IA de Objetos',
    'detected_objects': 'Objetos Detectados',
    'welcome_upload': '¡Bienvenido! Sube una imagen para comenzar.',
    'image_loaded': '¡Imagen cargada exitosamente!',
    'image_reset': 'Imagen restaurada al original.',
    'no_image_reset': 'No hay imagen para reiniciar.',
    'invalid_file': 'Por favor selecciona un archivo de imagen válido.',
    'invalid_drop': 'Por favor suelta un archivo de imagen válido.',
    'profile_updated': '¡Perfil actualizado exitosamente!',
    'download_success': '¡Imagen descargada exitosamente!',
    'no_image_download': 'No hay imagen para descargar.',
    'analyzing_objects': 'Analizando objetos en la imagen...',
    'analysis_complete': '¡Análisis de objetos completado!',
    'no_objects_found': 'No se detectaron objetos distintos en esta imagen.',
    'objects_detected': 'objetos detectados',
    'confidence': 'Confianza'
  },
  pt: {
    'app_title': 'TrueHue',
    'welcome_message': 'Bem-vindo ao Aplicativo de Aprimoramento para Daltonismo!',
    'settings': 'Configurações',
    'theme_label': 'Tema:',
    'language_label': 'Idioma:',
    'text_size_label': 'Tamanho do Texto:',
    'light_mode': 'Modo Claro',
    'dark_mode': 'Modo Escuro',
    'small': 'Pequeno',
    'medium': 'Médio',
    'large': 'Grande',
    'upload_image': 'Enviar Imagem',
    'download_image': 'Baixar Imagem',
    'analyze_image': 'Analisar Objetos',
    'simulation_mode': 'Modo Simulação',
    'enhancement_mode': 'Modo Aprimoramento',
    'original': 'Original',
    'red_deficiency': 'Deficiência Vermelha',
    'green_deficiency': 'Deficiência Verde',
    'blue_deficiency': 'Deficiência Azul',
    'reset': 'Reiniciar',
    'clear_analysis': 'Limpar Análise',
    'logout': 'Sair',
    'color_info_initial': 'Envie uma imagem e clique nela para ver as informações de cor aqui.',
    'edit_profile': 'Editar Perfil',
    'name_label': 'Nome:',
    'email_label': 'Email:',
    'avatar_label': 'Avatar:',
    'save': 'Salvar',
    'cancel': 'Cancelar',
    'ai_detection': 'Detecção IA de Objetos',
    'detected_objects': 'Objetos Detectados',
    'welcome_upload': 'Bem-vindo! Envie uma imagem para começar.',
    'image_loaded': 'Imagem carregada com sucesso!',
    'image_reset': 'Imagem restaurada ao original.',
    'no_image_reset': 'Nenhuma imagem para reiniciar.',
    'invalid_file': 'Por favor selecione um arquivo de imagem válido.',
    'invalid_drop': 'Por favor solte um arquivo de imagem válido.',
    'profile_updated': 'Perfil atualizado com sucesso!',
    'download_success': 'Imagem baixada com sucesso!',
    'no_image_download': 'Nenhuma imagem para baixar.',
    'analyzing_objects': 'Analisando objetos na imagem...',
    'analysis_complete': 'Análise de objetos concluída!',
    'no_objects_found': 'Nenhum objeto distinto detectado nesta imagem.',
    'objects_detected': 'objetos detectados',
    'confidence': 'Confiança'
  }
};

// Color blindness simulation matrices
const simulationMatrices = {
  protanopia: [
    [0.567, 0.433, 0],
    [0.558, 0.442, 0],
    [0, 0.242, 0.758]
  ],
  deuteranopia: [
    [0.625, 0.375, 0],
    [0.7, 0.3, 0],
    [0, 0.3, 0.7]
  ],
  tritanopia: [
    [0.95, 0.05, 0],
    [0, 0.433, 0.567],
    [0, 0.475, 0.525]
  ]
};

// Enhanced color detection functions
function isRedColor(r, g, b) {
  return r > g && r > b && r > 60 && (r - g) > 15 && (r - b) > 15;
}

function isGreenColor(r, g, b) {
  return g > r && g > b && g > 50 && (g - r) > 10 && (g - b) > 10;
}

function isBlueColor(r, g, b) {
  return b > r && b > g && b > 60 && (b - r) > 15 && (b - g) > 15;
}

function isYellowColor(r, g, b) {
  return r > 120 && g > 120 && b < 80 && Math.abs(r - g) < 50;
}

function getLuminance(r, g, b) {
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;
  
  const rLinear = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const gLinear = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const bLinear = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);
  
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  
  let h = 0;
  if (diff !== 0) {
    if (max === r) h = ((g - b) / diff + 6) % 6;
    else if (max === g) h = (b - r) / diff + 2;
    else h = (r - g) / diff + 4;
  }
  
  const s = max === 0 ? 0 : diff / max;
  const v = max;
  
  return [h * 60, s, v];
}

function hsvToRgb(h, s, v) {
  const c = v * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = v - c;
  
  let r = 0, g = 0, b = 0;
  
  if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
  else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
  else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
  else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
  else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
  else if (h >= 300 && h < 360) { r = c; g = 0; b = x; }
  
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ];
}

// AI Object Detection Functions
function analyzeImageForObjects() {
  if (!originalImageData) return;
  
  showStatus(translate('analyzing_objects'), 'info');
  detectedObjects = [];
  
  // Simulate AI processing time
  setTimeout(() => {
    performObjectDetection();
    displayDetectedObjects();
    showObjectMarkers();
    showStatus(translate('analysis_complete'), 'success');
  }, 2000);
}

function performObjectDetection() {
  const imageData = originalImageData;
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;
  
  // Sample multiple points across the image
  const samplePoints = [];
  const gridSize = 20;
  
  for (let y = 0; y < height; y += gridSize) {
    for (let x = 0; x < width; x += gridSize) {
      const index = (y * width + x) * 4;
      if (index < data.length) {
        samplePoints.push({
          x: x,
          y: y,
          r: data[index],
          g: data[index + 1],
          b: data[index + 2]
        });
      }
    }
  }
  
  // Group similar colored regions
  const colorRegions = groupColorRegions(samplePoints);
  
  // Identify objects based on color patterns
  Object.entries(objectDatabase).forEach(([objectName, objectData]) => {
    const matches = findObjectMatches(colorRegions, objectData, objectName);
    detectedObjects.push(...matches);
  });
  
  // Remove duplicate or overlapping detections
  detectedObjects = removeDuplicateDetections(detectedObjects);
  
  // Generate AI sentences for each detected object
  detectedObjects.forEach(obj => {
    obj.aiSentence = generateAISentence(obj);
  });
}

function groupColorRegions(samplePoints) {
  const regions = [];
  const threshold = 50; // Color similarity threshold
  
  samplePoints.forEach(point => {
    let addedToRegion = false;
    
    for (let region of regions) {
      if (isColorSimilar(point, region.avgColor, threshold)) {
        region.points.push(point);
        region.avgColor = calculateAverageColor(region.points);
        addedToRegion = true;
        break;
      }
    }
    
    if (!addedToRegion) {
      regions.push({
        points: [point],
        avgColor: { r: point.r, g: point.g, b: point.b }
      });
    }
  });
  
  // Filter out small regions
  return regions.filter(region => region.points.length > 3);
}

function isColorSimilar(point1, point2, threshold) {
  const distance = Math.sqrt(
    Math.pow(point1.r - point2.r, 2) +
    Math.pow(point1.g - point2.g, 2) +
    Math.pow(point1.b - point2.b, 2)
  );
  return distance < threshold;
}

function calculateAverageColor(points) {
  const total = points.reduce((acc, point) => ({
    r: acc.r + point.r,
    g: acc.g + point.g,
    b: acc.b + point.b
  }), { r: 0, g: 0, b: 0 });
  
  return {
    r: Math.round(total.r / points.length),
    g: Math.round(total.g / points.length),
    b: Math.round(total.b / points.length)
  };
}

function findObjectMatches(colorRegions, objectData, objectName) {
  const matches = [];
  
  colorRegions.forEach(region => {
    let bestMatch = 0;
    
    objectData.colors.forEach(objColor => {
      const similarity = calculateColorSimilarity(region.avgColor, objColor);
      if (similarity > bestMatch) {
        bestMatch = similarity;
      }
    });
    
    if (bestMatch > 0.7) { // Threshold for object detection
      const centerPoint = calculateRegionCenter(region.points);
      matches.push({
        name: objectName,
        confidence: Math.min(bestMatch * objectData.confidence, 0.95),
        position: centerPoint,
        color: region.avgColor,
        region: region,
        aiSentence: ''
      });
    }
  });
  
  return matches;
}

function calculateColorSimilarity(color1, color2) {
  const distance = Math.sqrt(
    Math.pow(color1.r - color2[0], 2) +
    Math.pow(color1.g - color2[1], 2) +
    Math.pow(color1.b - color2[2], 2)
  );
  
  // Normalize to 0-1 scale
  return Math.max(0, 1 - (distance / 441.67)); // 441.67 is max RGB distance
}

function calculateRegionCenter(points) {
  const center = points.reduce((acc, point) => ({
    x: acc.x + point.x,
    y: acc.y + point.y
  }), { x: 0, y: 0 });
  
  return {
    x: Math.round(center.x / points.length),
    y: Math.round(center.y / points.length)
  };
}

function removeDuplicateDetections(detections) {
  const filtered = [];
  const threshold = 50; // Distance threshold for considering detections as duplicates
  
  detections.forEach(detection => {
    let isDuplicate = false;
    
    for (let existing of filtered) {
      const distance = Math.sqrt(
        Math.pow(detection.position.x - existing.position.x, 2) +
        Math.pow(detection.position.y - existing.position.y, 2)
      );
      
      if (distance < threshold && detection.name === existing.name) {
        // Keep the one with higher confidence
        if (detection.confidence > existing.confidence) {
          const index = filtered.indexOf(existing);
          filtered[index] = detection;
        }
        isDuplicate = true;
        break;
      }
    }
    
    if (!isDuplicate) {
      filtered.push(detection);
    }
  });
  
  return filtered.sort((a, b) => b.confidence - a.confidence);
}

function generateAISentence(detectedObject) {
  const colorName = getClosestColor(detectedObject.color.r, detectedObject.color.g, detectedObject.color.b);
  const confidenceLevel = detectedObject.confidence > 0.8 ? 'high' : 
                         detectedObject.confidence > 0.6 ? 'moderate' : 'low';
  
  const sentences = {
    high: [
      `I detected a ${colorName} ${detectedObject.name} with high confidence.`,
      `Found a ${detectedObject.name} that appears to be ${colorName} in color.`,
      `This looks like a ${colorName}-colored ${detectedObject.name} to me.`
    ],
    moderate: [
      `I think this might be a ${colorName} ${detectedObject.name}.`,
      `This appears to be a ${detectedObject.name}, likely ${colorName} in color.`,
      `I'm moderately confident this is a ${colorName} ${detectedObject.name}.`
    ],
    low: [
      `This could be a ${detectedObject.name} with ${colorName} coloring.`,
      `I see something that resembles a ${colorName} ${detectedObject.name}.`,
      `This might be a ${detectedObject.name}, though I'm not entirely certain.`
    ]
  };
  
  const sentenceOptions = sentences[confidenceLevel];
  return sentenceOptions[Math.floor(Math.random() * sentenceOptions.length)];
}

// Color blindness simulation function
function simulateColorBlindness(r, g, b, type) {
  if (!simulationMatrices[type]) return [r, g, b];
  
  const matrix = simulationMatrices[type];
  const newR = matrix[0][0] * r + matrix[0][1] * g + matrix[0][2] * b;
  const newG = matrix[1][0] * r + matrix[1][1] * g + matrix[1][2] * b;
  const newB = matrix[2][0] * r + matrix[2][1] * g + matrix[2][2] * b;
  
  return [
    Math.max(0, Math.min(255, Math.round(newR))),
    Math.max(0, Math.min(255, Math.round(newG))),
    Math.max(0, Math.min(255, Math.round(newB)))
  ];
}

// Enhanced color enhancement functions
function enhanceRedGreenColors(r, g, b, filterType) {
  const [h, s, v] = rgbToHsv(r, g, b);
  let newR = r, newG = g, newB = b;
  
  if (isRedColor(r, g, b)) {
    const targetLuminance = 0.85;
    const hueShift = 25;
    
    const newHue = (h + hueShift) % 360;
    const enhancedSaturation = Math.min(1, s * 1.3);
    const enhancedValue = Math.max(v, targetLuminance);
    
    [newR, newG, newB] = hsvToRgb(newHue, enhancedSaturation, enhancedValue);
    
    const brightnessBoost = filterType === 'protanopia' ? 1.4 : 1.3;
    newR = Math.min(255, newR * brightnessBoost);
    newG = Math.max(0, newG * 0.7);
    newB = Math.max(0, newB * 0.8);
    
  } else if (isGreenColor(r, g, b)) {
    const targetLuminance = 0.55;
    const hueShift = -25;
    
    const newHue = (h + hueShift + 360) % 360;
    const enhancedSaturation = Math.min(1, s * 1.2);
    const enhancedValue = Math.min(Math.max(v, targetLuminance), 0.75);
    
    [newR, newG, newB] = hsvToRgb(newHue, enhancedSaturation, enhancedValue);
    
    newR = Math.max(0, newR * 0.8);
    newG = Math.min(200, newG * 1.2);
    newB = Math.min(255, newB * 1.3);
    
  } else if (g > 40 && g > r * 1.1 && g > b * 1.1) {
    newR = Math.max(0, r * 0.9);
    newG = Math.min(180, g * 1.25);
    newB = Math.min(255, b * 1.2);
    
  } else if (r > 40 && r > g * 1.1 && r > b * 1.1) {
    newR = Math.min(255, r * 1.35);
    newG = Math.max(0, g * 0.8);
    newB = Math.max(0, b * 0.9);
  }
  
  return [Math.round(newR), Math.round(newG), Math.round(newB)];
}

function enhanceBlueYellowColors(r, g, b) {
  const [h, s, v] = rgbToHsv(r, g, b);
  let newR = r, newG = g, newB = b;
  
  if (isBlueColor(r, g, b)) {
    const targetLuminance = 0.25;
    const hueShift = 15;
    
    const newHue = (h + hueShift) % 360;
    const enhancedSaturation = Math.min(1, s * 1.4);
    const darkenedValue = Math.min(v, targetLuminance);
    
    [newR, newG, newB] = hsvToRgb(newHue, enhancedSaturation, darkenedValue);
    
    newR = Math.min(120, newR * 1.2);
    newG = Math.max(0, newG * 0.6);
    newB = Math.max(30, newB * 0.8);
    
  } else if (isYellowColor(r, g, b)) {
    const targetLuminance = 0.9;
    const hueShift = 15;
    
    const newHue = (h + hueShift) % 360;
    const enhancedSaturation = Math.min(1, s * 1.3);
    const enhancedValue = Math.max(v, targetLuminance);
    
    [newR, newG, newB] = hsvToRgb(newHue, enhancedSaturation, enhancedValue);
    
    newR = Math.min(255, newR * 1.5);
    newG = Math.min(255, newG * 1.4);
    newB = Math.max(0, newB * 0.3);
    
  } else if (b > 40 && b > r * 1.1 && b > g * 1.1) {
    newR = Math.max(0, r * 0.7);
    newG = Math.max(0, g * 0.7);
    newB = Math.max(20, b * 0.6);
    
  } else if (r > 100 && g > 100 && b < 80 && Math.abs(r - g) < 80) {
    newR = Math.min(255, r * 1.4);
    newG = Math.min(255, g * 1.3);
    newB = Math.max(0, b * 0.4);
  }
  
  return [Math.round(newR), Math.round(newG), Math.round(newB)];
}

// Find closest named color
function getClosestColor(r, g, b) {
  let minDistance = Infinity;
  let closestColor = 'unknown';
  
  for (const [colorName, [colorR, colorG, colorB]] of Object.entries(namedColors)) {
    const distance = Math.sqrt(
      Math.pow(r - colorR, 2) +
      Math.pow(g - colorG, 2) +
      Math.pow(b - colorB, 2)
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = colorName;
    }
  }
  
  return closestColor;
}

// Translation helper function
function translate(key) {
  const currentLang = settings.language;
  return translations[currentLang] && translations[currentLang][key] ? translations[currentLang][key] : translations.en[key] || key;
}

// Update language function
function updateLanguage() {
  const elements = document.querySelectorAll('[data-key]');
  elements.forEach(element => {
    const key = element.getAttribute('data-key');
    if (key) {
      if (element.tagName === 'OPTION') {
        element.textContent = translate(key);
      } else if (element.tagName === 'INPUT' && element.type === 'submit') {
        element.value = translate(key);
      } else {
        element.textContent = translate(key);
      }
    }
  });
  
  updateFilterLabels();
}

// Update filter button labels based on mode
function updateFilterLabels() {
  const buttons = document.querySelectorAll('.filter-btn');
  
  if (currentMode === 'simulation') {
    buttons[1].textContent = translate('red_deficiency');
    buttons[2].textContent = translate('green_deficiency');
    buttons[3].textContent = translate('blue_deficiency');
  } else {
    buttons[1].textContent = translate('red_deficiency') + ' (' + translate('enhancement_mode') + ')';
    buttons[2].textContent = translate('green_deficiency') + ' (' + translate('enhancement_mode') + ')';
    buttons[3].textContent = translate('blue_deficiency') + ' (' + translate('enhancement_mode') + ')';
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  
  loadSettings();
  setupEventListeners();
  displayWelcomeMessage();
  setupDragAndDrop();
  updateFilterLabels();
  applySettings();
  loadUserProfile();
});

// Settings Functions
function loadSettings() {
  settings = {
    theme: 'light',
    language: 'en',
    textSize: 'medium'
  };
}

function saveSettings() {
  console.log('Settings saved:', settings);
}

function applySettings() {
  document.body.className = '';
  document.body.classList.add(`text-${settings.textSize}`);
  
  if (settings.theme === 'dark') {
    document.body.classList.add('dark-mode');
  }
  
  updateLanguage();
  
  document.getElementById('themeSelect').value = settings.theme;
  document.getElementById('languageSelect').value = settings.language;
  document.getElementById('textSizeSelect').value = settings.textSize;
}

// User Profile Functions
function loadUserProfile() {
  document.getElementById('userName').textContent = userProfile.name;
  document.getElementById('userEmail').textContent = userProfile.email;
  document.getElementById('profileImage').src = userProfile.avatar;
  
  document.getElementById('editName').value = userProfile.name;
  document.getElementById('editEmail').value = userProfile.email;
}

function saveUserProfile() {
  userProfile.name = document.getElementById('editName').value;
  userProfile.email = document.getElementById('editEmail').value;
  
  const avatarFile = document.getElementById('editAvatar').files[0];
  if (avatarFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      userProfile.avatar = e.target.result;
      document.getElementById('profileImage').src = userProfile.avatar;
    };
    reader.readAsDataURL(avatarFile);
  }
  
  loadUserProfile();
  closeProfileModal();
  showStatus(translate('profile_updated'), 'success');
}

function openProfileModal() {
  document.getElementById('profileModal').style.display = 'block';
}

function closeProfileModal() {
  document.getElementById('profileModal').style.display = 'none';
}

// Event Listeners Setup
function setupEventListeners() {
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsSidebar = document.getElementById('settingsSidebar');
  const closeSidebar = document.getElementById('closeSidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  
  settingsBtn.addEventListener('click', openSettings);
  closeSidebar.addEventListener('click', closeSettings);
  sidebarOverlay.addEventListener('click', closeSettings);
  
  document.getElementById('editProfileBtn').addEventListener('click', openProfileModal);
  document.getElementById('closeProfileModal').addEventListener('click', closeProfileModal);
  document.getElementById('saveProfile').addEventListener('click', saveUserProfile);
  document.getElementById('cancelProfile').addEventListener('click', closeProfileModal);
  
  document.getElementById('themeSelect').addEventListener('change', function(e) {
    settings.theme = e.target.value;
    saveSettings();
    applySettings();
  });
  
  document.getElementById('languageSelect').addEventListener('change', function(e) {
    settings.language = e.target.value;
    saveSettings();
    applySettings();
  });
  
  document.getElementById('textSizeSelect').addEventListener('change', function(e) {
    settings.textSize = e.target.value;
    saveSettings();
    applySettings();
  });
  
  document.getElementById('aiDetectionToggle').addEventListener('change', function(e) {
    aiDetectionEnabled = e.target.checked;
    const analyzeBtn = document.getElementById('analyzeBtn');
    analyzeBtn.style.display = aiDetectionEnabled ? 'inline-block' : 'none';
    
    if (!aiDetectionEnabled) {
      clearObjectAnalysis();
    }
  });
  
  document.getElementById('upload').addEventListener('change', handleFileUpload);
  document.getElementById('downloadBtn').addEventListener('click', downloadImage);
  document.getElementById('analyzeBtn').addEventListener('click', analyzeImageForObjects);
  
  document.getElementById('simulationMode').addEventListener('click', function() {
    setMode('simulation');
  });
  
  document.getElementById('enhancementMode').addEventListener('click', function() {
    setMode('enhancement');
  });
  
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      setFilter(this.getAttribute('data-filter'));
    });
  });
  
  canvas.addEventListener('click', handleCanvasClick);
  document.getElementById('resetBtn').addEventListener('click', resetImage);
  document.getElementById('clearAnalysisBtn').addEventListener('click', clearObjectAnalysis);
  
  document.getElementById('logoutBtn').addEventListener('click', function() {
    alert('Logout functionality would be implemented here');
  });
}

// Settings Functions
function openSettings() {
  const sidebar = document.getElementById('settingsSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  
  sidebar.classList.add('open');
  overlay.classList.add('active');
}

function closeSettings() {
  const sidebar = document.getElementById('settingsSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
}

// Display welcome message
function displayWelcomeMessage() {
  showStatus(translate('welcome_upload'), 'success');
}

// Show status message
function showStatus(message, type = 'info') {
  const statusMsg = document.getElementById('statusMsg');
  statusMsg.textContent = message;
  statusMsg.className = 'status-msg ' + type;
  statusMsg.style.display = 'block';
  
  setTimeout(() => {
    statusMsg.style.display = 'none';
  }, 3000);
}

// Handle file upload
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  if (!file.type.startsWith('image/')) {
    showStatus(translate('invalid_file'), 'error');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      loadImageToCanvas(img);
      showStatus(translate('image_loaded'), 'success');
      document.getElementById('downloadBtn').disabled = false;
      document.getElementById('analyzeBtn').disabled = false;
      clearObjectAnalysis();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Load image to canvas
function loadImageToCanvas(img) {
  const maxWidth = 800;
  const maxHeight = 600;
  
  let { width, height } = img;
  
  if (width > maxWidth) {
    height = (height * maxWidth) / width;
    width = maxWidth;
  }
  
  if (height > maxHeight) {
    width = (width * maxHeight) / height;
    height = maxHeight;
  }
  
  canvas.width = width;
  canvas.height = height;
  
  ctx.drawImage(img, 0, 0, width, height);
  originalImageData = ctx.getImageData(0, 0, width, height);
  
  applyCurrentFilter();
}

// Download image function
function downloadImage() {
  if (!canvas || !originalImageData) {
    showStatus(translate('no_image_download'), 'error');
    return;
  }
  
  const link = document.createElement('a');
  link.download = `truehue_${currentMode}_${currentFilter}_${Date.now()}.png`;
  link.href = canvas.toDataURL();
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  showStatus(translate('download_success'), 'success');
}

// Set mode (simulation or enhancement)
function setMode(mode) {
  currentMode = mode;
  
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  document.getElementById(mode + 'Mode').classList.add('active');
  
  updateFilterLabels();
  applyCurrentFilter();
}

// Set filter
function setFilter(filter) {
  currentFilter = filter;
  
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
  
  applyCurrentFilter();
}

// Apply current filter
function applyCurrentFilter() {
  if (!originalImageData) return;
  
  const imageData = ctx.createImageData(originalImageData);
  const data = imageData.data;
  const originalData = originalImageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    let r = originalData[i];
    let g = originalData[i + 1];
    let b = originalData[i + 2];
    let a = originalData[i + 3];
    
    if (currentFilter !== 'none') {
      if (currentMode === 'simulation') {
        [r, g, b] = simulateColorBlindness(r, g, b, currentFilter);
      } else {
        switch (currentFilter) {
          case 'protanopia':
          case 'deuteranopia':
            [r, g, b] = enhanceRedGreenColors(r, g, b, currentFilter);
            break;
          case 'tritanopia':
            [r, g, b] = enhanceBlueYellowColors(r, g, b);
            break;
        }
      }
    }
    
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
    data[i + 3] = a;
  }
  
  ctx.putImageData(imageData, 0, 0);
}

// Handle canvas click for color information
function handleCanvasClick(event) {
  if (!originalImageData) return;
  
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((event.clientX - rect.left) * (canvas.width / rect.width));
  const y = Math.floor((event.clientY - rect.top) * (canvas.height / rect.height));
  
  if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) return;
  
  // Check if clicked on an object marker first
  const clickedObject = detectedObjects.find(obj => {
    const distance = Math.sqrt(
      Math.pow(x - obj.position.x, 2) + 
      Math.pow(y - obj.position.y, 2)
    );
    return distance < 25; // 25 pixel radius around object center
  });
  
  if (clickedObject) {
    displayObjectColorInfo(clickedObject, x, y);
  } else {
    // Regular pixel color info
    const pixelData = originalImageData.data;
    const index = (y * canvas.width + x) * 4;
    
    const r = pixelData[index];
    const g = pixelData[index + 1];
    const b = pixelData[index + 2];
    
    displayColorInfo(r, g, b, x, y);
  }
}

// Display color information for detected objects
function displayObjectColorInfo(detectedObject, clickX, clickY) {
  const colorInfo = document.getElementById('colorInfo');
  const r = detectedObject.color.r;
  const g = detectedObject.color.g;
  const b = detectedObject.color.b;
  
  const closestColor = getClosestColor(r, g, b);
  const luminance = getLuminance(r, g, b);
  const [h, s, v] = rgbToHsv(r, g, b);
  
  // Get filtered color values
  let filteredR = r, filteredG = g, filteredB = b;
  let filteredHex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  let filteredColorName = closestColor;
  
  if (currentFilter !== 'none') {
    if (currentMode === 'simulation') {
      [filteredR, filteredG, filteredB] = simulateColorBlindness(r, g, b, currentFilter);
    } else {
      switch (currentFilter) {
        case 'protanopia':
        case 'deuteranopia':
          [filteredR, filteredG, filteredB] = enhanceRedGreenColors(r, g, b, currentFilter);
          break;
        case 'tritanopia':
          [filteredR, filteredG, filteredB] = enhanceBlueYellowColors(r, g, b);
          break;
      }
    }
    filteredHex = `#${filteredR.toString(16).padStart(2, '0')}${filteredG.toString(16).padStart(2, '0')}${filteredB.toString(16).padStart(2, '0')}`;
    filteredColorName = getClosestColor(filteredR, filteredG, filteredB);
  }
  
  const filterInfo = currentFilter !== 'none' ? 
    `<br><br><strong>After ${currentMode} (${currentFilter}):</strong><br>
     <strong>Color:</strong> ${filteredColorName}<br>
     <strong>RGB:</strong> (${filteredR}, ${filteredG}, ${filteredB})<br>
     <strong>Hex:</strong> ${filteredHex}` : '';
  
  colorInfo.innerHTML = `
    <div style="background: linear-gradient(135deg, #e8f5e8, #f0fff0); padding: 15px; border-radius: 10px; border-left: 4px solid #4caf50;">
      <h4 style="margin-bottom: 10px; color: #2e7d32;">🎯 ${detectedObject.aiSentence}</h4>
    </div>
    <br>
    <strong>Object:</strong> ${detectedObject.name} (${Math.round(detectedObject.confidence * 100)}% confidence)<br>
    <strong>Position:</strong> (${clickX}, ${clickY})<br>
    <strong>Original Color:</strong> ${closestColor}<br>
    <strong>RGB:</strong> (${r}, ${g}, ${b})<br>
    <strong>Hex:</strong> #${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}<br>
    <strong>HSV:</strong> (${Math.round(h)}°, ${Math.round(s * 100)}%, ${Math.round(v * 100)}%)<br>
    <strong>Luminance:</strong> ${(luminance * 100).toFixed(1)}%${filterInfo}
  `;
}

// Display regular color information
function displayColorInfo(r, g, b, x, y) {
  const colorInfo = document.getElementById('colorInfo');
  const closestColor = getClosestColor(r, g, b);
  const luminance = getLuminance(r, g, b);
  const [h, s, v] = rgbToHsv(r, g, b);
  
  // Get filtered color values if filter is active
  let filteredR = r, filteredG = g, filteredB = b;
  let filteredHex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  let filteredColorName = closestColor;
  
  if (currentFilter !== 'none') {
    if (currentMode === 'simulation') {
      [filteredR, filteredG, filteredB] = simulateColorBlindness(r, g, b, currentFilter);
    } else {
      switch (currentFilter) {
        case 'protanopia':
        case 'deuteranopia':
          [filteredR, filteredG, filteredB] = enhanceRedGreenColors(r, g, b, currentFilter);
          break;
        case 'tritanopia':
          [filteredR, filteredG, filteredB] = enhanceBlueYellowColors(r, g, b);
          break;
      }
    }
    filteredHex = `#${filteredR.toString(16).padStart(2, '0')}${filteredG.toString(16).padStart(2, '0')}${filteredB.toString(16).padStart(2, '0')}`;
    filteredColorName = getClosestColor(filteredR, filteredG, filteredB);
  }
  
  const filterInfo = currentFilter !== 'none' ? 
    `<br><br><strong>After ${currentMode} (${currentFilter}):</strong><br>
     <strong>Color:</strong> ${filteredColorName}<br>
     <strong>RGB:</strong> (${filteredR}, ${filteredG}, ${filteredB})<br>
     <strong>Hex:</strong> ${filteredHex}` : '';
  
  colorInfo.innerHTML = `
    <strong>Position:</strong> (${x}, ${y})<br>
    <strong>Original Color:</strong> ${closestColor}<br>
    <strong>RGB:</strong> (${r}, ${g}, ${b})<br>
    <strong>Hex:</strong> #${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}<br>
    <strong>HSV:</strong> (${Math.round(h)}°, ${Math.round(s * 100)}%, ${Math.round(v * 100)}%)<br>
    <strong>Luminance:</strong> ${(luminance * 100).toFixed(1)}%${filterInfo}
  `;
}

// Display detected objects
function displayDetectedObjects() {
  const resultsDiv = document.getElementById('aiAnalysisResults');
  const objectsList = document.getElementById('objectsList');
  
  if (detectedObjects.length === 0) {
    showStatus(translate('no_objects_found'), 'info');
    resultsDiv.style.display = 'none';
    return;
  }
  
  objectsList.innerHTML = '';
  
  detectedObjects.forEach((obj, index) => {
    const colorName = getClosestColor(obj.color.r, obj.color.g, obj.color.b);
    const objectItem = document.createElement('div');
    objectItem.className = 'object-item';
    objectItem.onclick = () => highlightObject(index);
    
    objectItem.innerHTML = `
      <h4>${obj.name} #${index + 1}</h4>
      <p><strong>AI Analysis:</strong> ${obj.aiSentence}</p>
      <p><strong>Color:</strong> ${colorName}</p>
      <p><strong>Position:</strong> (${obj.position.x}, ${obj.position.y})</p>
      <p><strong>${translate('confidence')}:</strong> ${Math.round(obj.confidence * 100)}%</p>
      <div class="confidence-bar">
        <div class="confidence-fill" style="width: ${obj.confidence * 100}%"></div>
      </div>
    `;
    
    objectsList.appendChild(objectItem);
  });
  
  resultsDiv.style.display = 'block';
  document.getElementById('clearAnalysisBtn').style.display = 'inline-block';
  
  showStatus(`${detectedObjects.length} ${translate('objects_detected')}`, 'success');
}

// Show object markers on canvas
function showObjectMarkers() {
  const overlay = document.getElementById('objectOverlay');
  overlay.innerHTML = '';
  
  const canvasRect = canvas.getBoundingClientRect();
  const scaleX = canvasRect.width / canvas.width;
  const scaleY = canvasRect.height / canvas.height;
  
  detectedObjects.forEach((obj, index) => {
    const marker = document.createElement('div');
    marker.className = 'object-marker';
    marker.style.left = (obj.position.x * scaleX) + 'px';
    marker.style.top = (obj.position.y * scaleY) + 'px';
    marker.onclick = () => highlightObject(index);
    
    const tooltip = document.createElement('div');
    tooltip.className = 'object-tooltip';
    tooltip.textContent = `${obj.name} (${Math.round(obj.confidence * 100)}%)`;
    marker.appendChild(tooltip);
    
    overlay.appendChild(marker);
  });
}

// Highlight specific object
function highlightObject(index) {
  const obj = detectedObjects[index];
  if (!obj) return;
  
  // Temporarily highlight the object
  const marker = document.querySelectorAll('.object-marker')[index];
  if (marker) {
    marker.style.background = '#ffff00';
    marker.style.transform = 'translate(-50%, -50%) scale(1.5)';
    
    setTimeout(() => {
      marker.style.background = '#ff4444';
      marker.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 1000);
  }
  
  // Show detailed color info
  displayObjectColorInfo(obj, obj.position.x, obj.position.y);
}

// Clear object analysis
function clearObjectAnalysis() {
  detectedObjects = [];
  document.getElementById('aiAnalysisResults').style.display = 'none';
  document.getElementById('objectOverlay').innerHTML = '';
  document.getElementById('clearAnalysisBtn').style.display = 'none';
  
  // Reset color info
  const colorInfo = document.getElementById('colorInfo');
  colorInfo.textContent = translate('color_info_initial');
}

// Reset image
function resetImage() {
  if (!originalImageData) {
    showStatus(translate('no_image_reset'), 'error');
    return;
  }
  
  ctx.putImageData(originalImageData, 0, 0);
  currentFilter = 'none';
  
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  document.querySelector('[data-filter="none"]').classList.add('active');
  
  clearObjectAnalysis();
  showStatus(translate('image_reset'), 'success');
}

// Drag and drop functionality
function setupDragAndDrop() {
  const mediaWrapper = document.querySelector('.media-wrapper');
  
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    mediaWrapper.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
  });
  
  ['dragenter', 'dragover'].forEach(eventName => {
    mediaWrapper.addEventListener(eventName, highlight, false);
  });
  
  ['dragleave', 'drop'].forEach(eventName => {
    mediaWrapper.addEventListener(eventName, unhighlight, false);
  });
  
  mediaWrapper.addEventListener('drop', handleDrop, false);
}

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight(e) {
  document.querySelector('.media-wrapper').classList.add('drag-over');
}

function unhighlight(e) {
  document.querySelector('.media-wrapper').classList.remove('drag-over');
}

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;
  
  if (files.length > 0) {
    const file = files[0];
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
          loadImageToCanvas(img);
          showStatus(translate('image_loaded'), 'success');
          document.getElementById('downloadBtn').disabled = false;
          document.getElementById('analyzeBtn').disabled = false;
          clearObjectAnalysis();
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      showStatus(translate('invalid_drop'), 'error');
    }
  }
}