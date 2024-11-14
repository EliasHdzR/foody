const RestaurantImage = ({ imagePath, className='' }) => {
    return (
        <div className={className}>
            <img src={`/storage/${imagePath}`} alt="Restaurant" title="Restaurant"/>
        </div>
    );
};

export default RestaurantImage;
