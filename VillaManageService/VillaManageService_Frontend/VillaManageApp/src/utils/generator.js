const generatedHexColors = new Set();
const generatedHueColors = new Set();

export const clearGeneratedColors = () => {
  generatedHueColors.clear();
  generatedHexColors.clear();
};

export const generateRandomColor = () => {
  let color;
  do {
    do {
      color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    } while (color === '#ffffff' || generatedHexColors.has(color)); // 'white'와 이미 생성된 색상을 제외
  } while (generatedHexColors.size >= 16777214); // 모든 색상을 사용한 경우 종료 (백만-to-one 확률)

  generatedHexColors.add(color);
  return color;
};

export const generateRandomHueColor = numColors => {
  if (generatedHueColors.size >= numColors) {
    console.warn('All colors have been generated, resetting color set.');
    generatedHueColors.clear();
  }

  const hueStep = 360 / numColors; // 360도를 numColors로 나눠 일정한 간격을 얻습니다.

  let newColor;
  do {
    const hue = (generatedHueColors.size * hueStep) % 360;
    newColor = `hsl(${hue}, 80%, 60%)`;
  } while (generatedHueColors.has(newColor));

  generatedHueColors.add(newColor);

  return newColor;
};
