import { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
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
  const [activeFilter, setActiveFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["admin-messages"],
    queryFn: ({ pageParam }) =>
      getContactMessages({ pageSize: 20, lastDoc: pageParam }),
    getNextPageParam: (lastPage) => lastPage.lastDoc ?? undefined,
  });

  const messages = data?.pages?.flatMap((page) => page.items) || [];

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
      await refetch();
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
      await refetch();

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

          {!isLoading && isError && (
            <div className="admin-messages-empty">
              <div>
                <FaInbox aria-hidden="true" />
              </div>
              <h2>Unable to load messages</h2>
              <p>Failed to load messages.</p>
            </div>
          )}

          {!isLoading && !isError && filteredMessages.length === 0 && (
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

          {!isLoading && !isError && filteredMessages.length > 0 && (
            <>
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
                          <a href={`mailto:${message.email}`}>
                            {message.email}
                          </a>
                        </p>
                      )}
                    </div>

                    <div className="admin-message-card__body">
                      <p>{message.message}</p>
                    </div>
                  </article>
                ))}
              </div>

              {hasNextPage && (
                <div className="admin-load-more">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage ? "Loading..." : "Load more"}
                  </button>
                </div>
              )}
            </>
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
