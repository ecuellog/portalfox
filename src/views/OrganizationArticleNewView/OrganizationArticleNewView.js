import React, {useState} from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './OrganizationArticleNewView.scss';
import { createArticle } from '../../store/actions/articles';
import WrapperJoditEditor from '../../components/WrapperJoditEditor/WrapperJoditEditor';

function OrganizationArticleNewView (props) {
  let history = useHistory();

  const defaultArticleInfo = {
    title: '',
    summary: ''
  };

  const [articleInfo, setArticleInfo] = useState(defaultArticleInfo);
  const [content, setContent] = useState('');
  
  function goBack() {
    history.goBack();
  }

  function onSubmit(e) {
    e.preventDefault();
    let channelId = props.match.params.channelId;

    props.createArticle(channelId, {...articleInfo, content})
      .then((message) => {
        alert(message);
        goBack();
      })
      .catch((error) => {
        alert(error);
      })
  }

	return (
    <div className="Component_OrganizationArticleNewView container py-5">
      <button className="btn btn-blank btn-back" onClick={goBack}>
        <i className="fas fa-chevron-left"></i>
        Back
      </button>
      <h2 className="mt-5 mb-4">Create Article</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input  
          type="text"
          name="title"
          className="title-input"
          value={articleInfo.title}
          onChange={e => setArticleInfo({...articleInfo, title: e.target.value})}
        ></input>
        <label htmlFor="summary" className="mt-4">Summary</label>
        <textarea
          name="summary"
          value={articleInfo.summary}
          onChange={e => setArticleInfo({...articleInfo, summary: e.target.value})}
        ></textarea>
        <label className="mt-4">Content</label>
        <WrapperJoditEditor
          value={content}
          onBlur={content => setContent(content)}
          tabIndex={4}
        />
        <div className="d-flex justify-content-center mt-5">
          <button className="btn btn-blank" type="button" onClick={goBack}> Cancel </button>
          <button className="btn btn-primary"> Save </button>
        </div>
      </form>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    createArticle: (channelId, articleInfo) => dispatch(createArticle(channelId, articleInfo))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(OrganizationArticleNewView));