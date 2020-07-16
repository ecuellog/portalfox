import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { fetchChannels, createChannel } from '../../store/actions/channels';
import Loader from '../Loader/Loader';
import './PlatformOrgChannels.scss';

function PlatformOrgChannels(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (props.organization) {
      props.fetchChannels()
        .finally(() => {
          setLoading(false);
        });
    }
  }, [props.organization]);

  return (
    <div className="p-4">
      <h2 className="mt-3">Channels</h2>
      <hr/>
      {
        loading && 
        <Loader/>
      }
      {
        !loading &&
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="row my-3">
              <div className="col-12">
                <div className="card card-body">
                  {
                    !props.channels.length &&
                    <div>
                      No channels, create a new one  below  
                    </div>
                  }
                  { !!props.channels.length && props.channels.map((channel) => (
                    <h5>{channel.name}</h5>
                  ))}
                  <hr/>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">Create Channel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

function mapStateToProps(state) {
  return {
    channels: state.channels.channels,
    organization: state.organizations.activeOrganization
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createChannel: (channelInfo) => dispatch(createChannel(channelInfo)),
    fetchChannels: () => dispatch(fetchChannels())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (PlatformOrgChannels);
