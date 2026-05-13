import { FaImages, FaPlus } from "react-icons/fa";

import "./AdminGallery.css";

const AdminGallery = () => {
  return (
    <div className="admin-content">
      <div className="admin-page-header admin-page-header--row">
        <div>
          <span>Gallery</span>
          <h1>Manage Gallery Images</h1>
          <p>
            Upload, organize, and manage property gallery images shown on the
            public gallery page.
          </p>
        </div>

        <button type="button" className="admin-primary-action">
          <FaPlus aria-hidden="true" />
          Add Image
        </button>
      </div>

      <div className="admin-empty-state">
        <div>
          <FaImages aria-hidden="true" />
        </div>

        <h2>Gallery manager coming next</h2>

        <p>
          This page is ready for Firebase Storage integration. Next we will add
          image upload, category selection, and delete controls.
        </p>
      </div>
    </div>
  );
};

export default AdminGallery;
