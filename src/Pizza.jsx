let counter = 0;
const Pizza = (props) => {
  counter++;
  return (
    <div
      className="pizza"
      onClick={() => {
        alert("You clicked on the pizza");
      }}
    >
      <h1>
        {props.name} {counter}{" "}
      </h1>
      <p>{props.description}</p>
      <img
        src={props.image ? props.image : "https://picsum.photos/200"}
        alt={props.name}
      />
    </div>
  );
};

export default Pizza;
