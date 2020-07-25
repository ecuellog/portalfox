import React, {useState, useRef} from 'react';
import {PassiveListener} from 'react-event-injector';
import { useHistory, withRouter } from 'react-router-dom';
import JoditEditor from "jodit-react";
import { connect } from 'react-redux';
import './OrganizationArticleNewView.scss';
import { createArticle } from '../../store/actions/articles';
import WrapperJoditEditor from '../../components/WrapperJoditEditor/WrapperJoditEditor';

function OrganizationArticleNewView (props) {
  let history = useHistory();
  const defaultArticleInfo = {
    title: '',
    summary: '',
    content: ''
  };
  const [articleInfo, setArticleInfo] = useState(defaultArticleInfo);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');


  const config = {
    readonly: false,
    uploader: {
      insertImageAsBase64URI: true
    },
    buttons: "paragraph,|,bold,strikethrough,underline,italic,eraser,|,superscript,subscript,|,ul,ol,|,outdent,indent,|,font,fontsize,brush,|,image,file,video,table,link,|,align,undo,redo,\n,selectall,cut,copy,paste,copyformat,|,hr,symbol,fullsize,print",
    iframe: true
  }
  
  function goBack() {
    history.goBack();
  }

  function onSubmit(e) {
    e.preventDefault();
    let channelId = props.match.params.channelId;

    props.createArticle(channelId, articleInfo)
      .then((message) => {
        alert(message);
        goBack();
      })
      .catch((error) => {
        alert(error);
      })
  }

  function handleTitleInput(e) {
    //e.preventDefault();
    //e.stopPropagation();
    //e.nativeEvent.stopImmediatePropagation();
    setTitle(e.target.value);
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
        <PassiveListener>
          <input  
            type="text"
            name="title"
            className="title-input"
            value={title}
            onChange={handleTitleInput}
          ></input>
        </PassiveListener>
        <label htmlFor="summary" className="mt-4">Summary</label>
        <textarea
          name="summary"
          value={summary}
          onChange={e => setSummary(e.target.value)}
        ></textarea>
        <label className="mt-4">Content</label>
        <WrapperJoditEditor/>
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