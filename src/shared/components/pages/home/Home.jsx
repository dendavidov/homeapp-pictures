import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchPhotoLabels } from '../../../redux/photoLabels';

import styles from './Home.styl';
import { REQUEST_STATUSES } from '../../../libs/api';
import ErrorComponent from '../../common/error-component/ErrorComponent';
import LoadingComponent from '../../common/loading-component/LoadingComponent';

class Home extends React.Component {
  state = {
    labels: [],
  };

  componentDidMount() {
    this.props.fetchPhotoLabels();
  }

  render() {
    const { status, data } = this.props.photoLabels;
    if (status === REQUEST_STATUSES.ERROR)
      return (
        <div className={styles.root}>
          <ErrorComponent error="Ошибка" />
        </div>
      );

    if (status !== REQUEST_STATUSES.SUCCESS)
      return (
        <div className={styles.root}>
          <LoadingComponent />
        </div>
      );
    return (
      <div className={styles.root}>
        <textarea className="form-control" />
        <div className={styles.wrapper}>
          <div className={styles.photosContainer}>
            {Object.values(data).map(item => (
              <button
                className={styles.photo}
                key={item.photo}
                style={{
                  backgroundImage: `url(${item.photo})`,
                }}
                onClick={() =>
                  this.setState({
                    labels: item.labels,
                  })
                }
              />
            ))}
          </div>
          <div className={styles.labelsContainer}>
            {this.state.labels.map(label => (
              <div
                key={`${label.type}-${label.score}`}
                className={styles.label}
              >
                <div>{label.type}:</div>
                <div>{label.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  photoLabels: state.photoLabels,
});

const mapActionsToProps = dispatch =>
  bindActionCreators(
    {
      fetchPhotoLabels,
    },
    dispatch
  );

Home.propTypes = {
  photoLabels: PropTypes.shape().isRequired,
  fetchPhotoLabels: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
