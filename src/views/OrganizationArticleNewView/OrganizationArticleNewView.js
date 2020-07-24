import React from 'react';
import { connect } from 'react-redux';

function OrganizationArticleNewView(props) {
  return (
    <div>
      new article
    </div>
  );
}

function mapDispatchToProps(dispatch){
  return {
  }
}

function mapStateToProps(state){
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationArticleNewView);
