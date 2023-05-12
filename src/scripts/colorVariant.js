class ColorVariant {
  constructor (color, {variant = 0, convertType = "hex"} = options) {
    this.color = color;
    this.variant = variant;
    this.convertType = convertType;
  }

  static getToHex (rgba) {
    // "rgba(212, 242, 227, .5)" --> [212, 242, 227, 0.5]
    rgba = rgba.substring(rgba.indexOf('(') + 1, rgba.lastIndexOf(')')).split(',');
    let alpha = '';
    // Alfa kanalının 0-255 aralığındaki değerini yüzdeye çevirir
    if (rgba[3]) {
      alpha = Math.round(parseFloat(rgba[3]) * 255).toString(16);
      if (alpha && alpha.length === 1) alpha = '0' + alpha; // Tam bir alfa değeri sağlamak için
    }
    let hex = '#' + ((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1);
    // Alfa değerini HEX'e ekle
    hex = hex.slice(0, 7) + alpha;
    
    return hex;
  }
  
  static getToRGBA (hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const rgb = result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      t: 1
    } : null;

    return 'rgba('+ rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + rgb.t +')';
  }
  
  _getDarkerColor (hex, percent) {
    // HEX kodunu RGB bileşenlerine dönüştürür
    let r = parseInt(hex.substring(0,2),16);
    let g = parseInt(hex.substring(2,4),16);
    let b = parseInt(hex.substring(4,6),16);
    
    // RGB bileşenlerini yüzdeye göre değiştirir
    r = Math.round(r * (1 - percent / 100));
    g = Math.round(g * (1 - percent / 100));
    b = Math.round(b * (1 - percent / 100));
    
    // RGB bileşenlerini HEX koduna dönüştürür
    let result = ((r << 16) | (g << 8) | b).toString(16);
    while (result.length < 6) {
      result = '0' + result;
    }
    return '#' + result;
  }
  
  _getLighterColor (hex, percent) {
    // HEX kodunu RGB bileşenlerine dönüştürür
    let r = parseInt(hex.substring(0,2),16);
    let g = parseInt(hex.substring(2,4),16);
    let b = parseInt(hex.substring(4,6),16);
    
    // RGB bileşenlerini yüzdeye göre değiştirir
    r = Math.round(r + (255 - r) * (percent / 100));
    g = Math.round(g + (255 - g) * (percent / 100));
    b = Math.round(b + (255 - b) * (percent / 100));
    
    // RGB bileşenlerini HEX koduna dönüştürür
    let result = ((r << 16) | (g << 8) | b).toString(16);
    while (result.length < 6) {
      result = '0' + result;
    }
    return '#' + result;
  }
}

export default ColorVariant;