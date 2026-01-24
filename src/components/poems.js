function createMarkup(currentPoemName, poemsData) {
  const currentPoemCell = poemsData.findIndex(item => item.name === currentPoemName);
  if (currentPoemCell !== -1) {
    return {
      __html: `
        <div class="poem-wrapper">
          <div class="poem-number">
            <pre class="poemtext">${currentPoemCell + 1}</pre>
          </div>
          <div class="poem-content">
            ${poemsData[currentPoemCell].content}
          </div>
        </div>
      `
    };
  } else {
    return {
      __html: `
        <div class="poem-wrapper">
          <div class="poem-content">
            ${poemsData[0].content}
          </div>
        </div>
      `
    };
  }
}

export default function Poems({ currentPoem, poemsdata }) {
  return (
    <div
      className="poemcontainer"
      dangerouslySetInnerHTML={createMarkup(currentPoem, poemsdata)}
    />
  );
}
