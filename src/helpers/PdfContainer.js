import React from 'react';

export default (props) => {
  const bodyRef = React.createRef();
  const createPdf = () => props.createPdf(bodyRef.current);
  return (
    <div>
      <div className="account__head">
      <h1 className="account__heading">Payments</h1>
      <button className="btn btn__download" onClick={createPdf}>Download</button>
    </div>
    <div className="account__payment">
      <section className="pdf-body" ref={bodyRef}>
        {props.children}
      </section>
      </div>
    </div>
  )
}