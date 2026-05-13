import { useEffect, useMemo, useState } from "react";
import {
  FaEnvelope,
  FaInbox,
  FaPhoneAlt,
  FaRegEnvelopeOpen,
  FaTrash,
} from "react-icons/fa";

import {
  deleteContactMessage,
  getContactMessages,
  updateMessageStatus,
} from "../../services/contactService";
import SEO from "../../components/SEO";

import "./AdminMessages.css";

const formatMessageDate = (timestamp) => {
  if (!timestamp?.toDate) return "Date unavailable";

  return timestamp.toDate().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const AdminMessages = () => {
  
  const [messages, setMessages] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const contactMessages = await getContactMessages();
      setMessages(contactMessages);
    } catch (error) {
      setErrorMessage(error.message || "Failed to load messages.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const filteredMessages = useMemo(() => {
    if (activeFilter === "all") return messages;

    return messages.filter((message) => message.status === activeFilter);
  }, [activeFilter, messages]);

  const unreadCount = messages.filter(
    (message) => message.status === "unread",
  ).length;

  const handleToggleReadStatus = async (message) => {
    const nextStatus = message.status === "unread" ? "read" : "unread";

    try {
      setStatusMessage("");
      await updateMessageStatus(message.id, nextStatus);
      await loadMessages();
    } catch (error) {
      setErrorMessage(error.message || "Failed to update message.");
    }
  };

  const openDeleteModal = (message) => {
    setDeleteTarget(message);
    setStatusMessage("");
    setErrorMessage("");
  };

  const closeDeleteModal = () => {
    if (isDeleting) return;
    setDeleteTarget(null);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setIsDeleting(true);
      setErrorMessage("");

      await deleteContactMessage(deleteTarget.id);
      await loadMessages();

      setStatusMessage("Message deleted successfully.");
      setDeleteTarget(null);
    } catch (error) {
      setErrorMessage(error.message || "Failed to delete message.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <SEO title="Client Messages" path="/admin/messages" noindex />

      <div className="admin-content">
        <div className="admin-page-header">
          <span>Messages</span>
          <h1>Client Inquiries</h1>
          <p>
            View and manage messages submitted from the public contact form.
          </p>
        </div>

        <div className="admin-messages-summary">
          <article>
            <span>Total Messages</span>
            <strong>{messages.length}</strong>
          </article>

          <article>
            <span>Unread Messages</span>
            <strong>{unreadCount}</strong>
          </article>
        </div>

        <div className="admin-messages-toolbar">
          {["all", "unread", "read"].map((filter) => (
            <button
              key={filter}
              type="button"
              className={
                activeFilter === filter
                  ? "admin-message-filter is-active"
                  : "admin-message-filter"
              }
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {statusMessage && (
          <div className="admin-messages-alert success">{statusMessage}</div>
        )}

        <div className="admin-messages-card">
          {isLoading && (
            <div className="admin-messages-empty">
              <div>
                <FaInbox aria-hidden="true" />
              </div>

              <h2>Loading messages...</h2>
              <p>Please wait while we load client inquiries.</p>
            </div>
          )}

          {!isLoading && errorMessage && (
            <div className="admin-messages-empty">
              <div>
                <FaInbox aria-hidden="true" />
              </div>

              <h2>Unable to load messages</h2>
              <p>{errorMessage}</p>
            </div>
          )}

          {!isLoading && !errorMessage && filteredMessages.length === 0 && (
            <div className="admin-messages-empty">
              <div>
                <FaInbox aria-hidden="true" />
              </div>

              <h2>No messages found</h2>
              <p>
                Messages submitted from the contact form will appear here
                automatically.
              </p>
            </div>
          )}

          {!isLoading && !errorMessage && filteredMessages.length > 0 && (
            <div className="admin-message-list">
              {filteredMessages.map((message) => (
                <article
                  className={
                    message.status === "unread"
                      ? "admin-message-card is-unread"
                      : "admin-message-card"
                  }
                  key={message.id}
                >
                  <div className="admin-message-card__top">
                    <div>
                      <span
                        className={`admin-message-status ${message.status}`}
                      >
                        {message.status}
                      </span>

                      <h2>{message.subject || "Project Inquiry"}</h2>

                      <p>{formatMessageDate(message.createdAt)}</p>
                    </div>

                    <div className="admin-message-card__actions">
                      <button
                        type="button"
                        onClick={() => handleToggleReadStatus(message)}
                        title={
                          message.status === "unread"
                            ? "Mark as read"
                            : "Mark as unread"
                        }
                      >
                        <FaRegEnvelopeOpen aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={() => openDeleteModal(message)}
                        title="Delete message"
                      >
                        <FaTrash aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="admin-message-card__meta">
                    <p>
                      <strong>Name:</strong>
                      <span>{message.name}</span>
                    </p>

                    <p>
                      <FaPhoneAlt aria-hidden="true" />
                      <a href={`tel:${message.phone}`}>{message.phone}</a>
                    </p>

                    {message.email && (
                      <p>
                        <FaEnvelope aria-hidden="true" />
                        <a href={`mailto:${message.email}`}>{message.email}</a>
                      </p>
                    )}
                  </div>

                  <div className="admin-message-card__body">
                    <p>{message.message}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {deleteTarget && (
          <div
            className="admin-message-delete-modal"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="admin-message-delete-modal__backdrop"
              onClick={closeDeleteModal}
              aria-label="Close delete confirmation"
            />

            <div className="admin-message-delete-modal__card">
              <div className="admin-message-delete-modal__icon">
                <FaTrash aria-hidden="true" />
              </div>

              <span>Delete Message</span>

              <h2>Are you sure?</h2>

              <p>
                This client inquiry will be permanently removed from the admin
                dashboard. This action cannot be undone.
              </p>

              <div className="admin-message-delete-modal__preview">
                <div className="admin-message-delete-modal__avatar">
                  {(deleteTarget.name || "C").charAt(0).toUpperCase()}
                </div>

                <div>
                  <strong>{deleteTarget.name || "Client Inquiry"}</strong>
                  <small>{deleteTarget.subject || "Project Inquiry"}</small>
                  <p>{deleteTarget.message}</p>
                </div>
              </div>

              <div className="admin-message-delete-modal__actions">
                <button
                  type="button"
                  className="admin-message-delete-modal__cancel"
                  onClick={closeDeleteModal}
                  disabled={isDeleting}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="admin-message-delete-modal__confirm"
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminMessages;
