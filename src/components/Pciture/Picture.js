import React from 'react';
import './Picture.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPicture } from '../../redux/myCollection/myCollection.action';

const Picture = (props) => {
  const { largeImageURL, addPicture, noButton } = props;
  const submitHandler = (e) => {
    e.preventDefault();
    addPicture(props);
  };
  return (
    <div className="contentsWrapper">
      <img src={largeImageURL} className="pictureImg" />
      {noButton ? null : (
        <button type="button" className="addBtn" onClick={(e) => submitHandler(e)}>
          ADD MY COLLECTION
        </button>
      )}
    </div>
  );
};
Picture.propTypes = {
  addPicture: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  noButton: PropTypes.bool,
};

const mapDispatchToProps = (dispatch) => ({
  addPicture: (props) => dispatch(addPicture(props)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Picture);
