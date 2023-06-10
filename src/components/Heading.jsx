/* eslint-disable react/prop-types */

const Heading = ({heading}) => {
    return (
        <div className="text-center py-8 bg-base-200">
            <p>--------------------------------------------------------</p>
            <h2 className="text-3xl uppercase text-accent font-bold">{heading}</h2>
            <p>--------------------------------------------------------</p>
        </div>
    );
};

export default Heading;