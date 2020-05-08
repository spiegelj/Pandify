// Thanks:  https://blog.logrocket.com/building-a-modal-module-for-react-with-react-router/
// When more clear-headed...need to return here and add in more handling stuff
import React, { Component, useState, useEffect }  from 'react';
import { withRouter } from 'react-router-dom';
import { useHistory } from 'react-router';

const Modal = () => {
    let history = useHistory();
    return (
      <div
        role="button"
        className="modal-wrapper"
        onClick={() => history.goBack()}
      >
        <div
          role="button"
          className="modal"
          onClick={e => e.stopPropagation()}
        >
          <p>CONTENT</p>
          <button onClick={history.goBack()}>Back</button>

        </div>
      </div>
    );
}
export default withRouter(Modal);