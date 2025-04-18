const MyListRow = ({ savedspot, onDelete }) => {
  const { _id, customerName, email, tourists_spot_name, image, country_name } = savedspot;

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
    if (confirmDelete) {
      fetch(`https://my-server-black.vercel.app/saveSpotData/${_id}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            alert(data.message);
            onDelete(_id); 
          } else {
            alert(data.message || "Failed to delete booking");
          }
        })
        .catch(error => {
          console.error("Error deleting booking:", error);
        });
    }
  };

  return (
    <tr>
    
      <td>
        <span>
          <img src={image}></img>
        </span>
      </td>
      <td>
        <span>
          {customerName} 
        </span>
      </td>
      <td>
        <span>
          {tourists_spot_name} 
        </span>
      </td>
      <td>
        <span >
          {country_name} 
        
        </span>
      
      </td>
      <th>
        <button className="btn btn-ghost btn-xs" onClick={handleDelete}>
          Delete
        </button>
      </th>
    </tr>
  );
};

export default MyListRow;
