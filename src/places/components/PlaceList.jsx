import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css";

const PlaceList = ({ items, onDeletePlace }) => {
  return items.length ? (
    <ul className="place-list">
      {items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={onDeletePlace}
        />
      ))}
    </ul>
  ) : (
    <div className="center place-list">
      <Card>
        <h2>No places found.</h2>
        <Button to="/places/new">Share Place</Button>
      </Card>
    </div>
  );
};

export default PlaceList;
