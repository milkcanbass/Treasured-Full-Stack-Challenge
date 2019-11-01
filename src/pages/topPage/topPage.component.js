import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import SimpleBar from 'simplebar-react';
import { fetchPictures } from '../../redux/data/data.action';
import Picture from '../../components/Pciture/Picture';
import 'simplebar/dist/simplebar.css';

import { selectPictures } from '../../redux/data/data.selectors';
import { selectMyCollection } from '../../redux/myCollection/myCollection.selectors';
import './topPage.styles.css';

const TopPage = ({ pictures, fetchPictures, myCollection }) => {
  const [searchWord, setSearchWord] = useState({
    userSearch: '',
  });

  const { userSearch } = searchWord;

  console.log(myCollection);

  // Fetching data here
  const submitHandler = (e) => {
    e.preventDefault();
    if (!userSearch) {
      return null;
    }
    const string = userSearch.replace(/  +/g, ' ');
    const searchWord = string.replace(/ /g, '+');
    // yellow + flowers;
    fetchPictures(searchWord);
  };

  // For submit new tag by pushing enter key
  const onKeypress = (e) => {
    if (e.which === 13) {
      submitHandler(e);
    }
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    setSearchWord({
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="background">
      <div className="appWrapper">
        <div className="inputWrapper">
          <input
            value={userSearch}
            name="userSearch"
            id="name-input"
            className="searchBar"
            placeholder="Enter keyword for search"
            autoComplete="off"
            maxLength="100"
            onKeyPress={(e) => onKeypress(e)}
            onChange={(e) => onChangeHandler(e)}
          />
        </div>
        <SimpleBar forceVisible="y" style={{ height: '350px' }}>
          <div className="picturesWrapper">
            {pictures.length > 0 ? (
              pictures.map((picture, idx) => (
                <Picture key={idx} {...picture} id={idx} picture={picture} />
              ))
            ) : (
              <div>No items</div>
            )}
          </div>
        </SimpleBar>
      </div>
      <div className="myCollectionWrapper">
        <h3>My Collection</h3>
        <SimpleBar forceVisible="y" style={{ height: '350px' }}>
          <div className="picturesWrapper">
            {myCollection.length > 0 ? (
              myCollection.map((picture, idx) => (
                <Picture key={idx} {...picture} id={idx} picture={picture} noButton />
              ))
            ) : (
              <div>No items</div>
            )}
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

TopPage.propTypes = {
  fetchPictures: PropTypes.func.isRequired,
  pictures: PropTypes.array,
  myCollection: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => ({
  fetchPictures: (searchWord) => dispatch(fetchPictures(searchWord)),
});

const mapStateToProps = createStructuredSelector({
  pictures: selectPictures,
  myCollection: selectMyCollection,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopPage);
