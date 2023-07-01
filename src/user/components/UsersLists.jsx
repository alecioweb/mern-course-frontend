// import "./UserItem";
import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import "./UsersList.css";
const UsersLists = ({ items }) => {
  return items.length > 0 ? (
    <ul className="users-list">
      {items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </ul>
  ) : (
    <div className="center">
      {/* <Card> */}
      <h2>No users found.</h2>
      {/* </Card> */}
    </div>
  );
};

export default UsersLists;
