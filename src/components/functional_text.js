function functional_text(props) {
  if (props.type == "LINK")
    <a href={props.link} target={props.target}>{props.text}</a>
  else
    return <h1>ft, {props.name}</h1>;
  }