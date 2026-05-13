import { FaInbox } from "react-icons/fa";

import "./AdminMessages.css";

const AdminMessages = () => {
  return (
    <div className="admin-content">
      <div className="admin-page-header">
        <span>Messages</span>
        <h1>Client Inquiries</h1>
        <p>
          Contact form messages will appear here after Firebase Firestore
          integration.
        </p>
      </div>

      <div className="admin-messages-empty">
        <div>
          <FaInbox aria-hidden="true" />
        </div>

        <h2>No messages connected yet</h2>

        <p>
          Next we will connect the public contact form to Firestore and show
          submitted client inquiries here.
        </p>
      </div>
    </div>
  );
};

export default AdminMessages;
