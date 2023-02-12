function createMarkup() {
    return {__html: '<pre>   Ara  \n hjh</pre>'};
  }
export default function Poems() {
    return <div dangerouslySetInnerHTML={createMarkup()} />;
  }