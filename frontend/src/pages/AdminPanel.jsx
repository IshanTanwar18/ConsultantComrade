import { useEffect, useState } from "react";
import { api } from "../api";

export default function AdminPanel() {
  const [projectForm, setProjectForm] = useState({
    imageUrl: "",
    name: "",
    description: "",
  });

  const [clientForm, setClientForm] = useState({
    imageUrl: "",
    name: "",
    description: "",
    designation: "",
  });

  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  const handleProjectChange = (e) => {
    setProjectForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClientChange = (e) => {
    setClientForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addProject = async (e) => {
    e.preventDefault();
    try {
      await api.post("/projects", projectForm);
      alert("Project added!");
      setProjectForm({ imageUrl: "", name: "", description: "" });
    } catch (err) {
      console.error(err);
      alert("Error adding project");
    }
  };

  const addClient = async (e) => {
    e.preventDefault();
    try {
      await api.post("/clients", clientForm);
      alert("Client added!");
      setClientForm({
        imageUrl: "",
        name: "",
        description: "",
        designation: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error adding client");
    }
  };

  const fetchAdminData = async () => {
    try {
      const [contactsRes, subsRes] = await Promise.all([
        api.get("/contacts"),
        api.get("/subscribers"),
      ]);
      setContacts(contactsRes.data);
      setSubscribers(subsRes.data);
    } catch (err) {
      console.error("Error fetching admin data", err);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fieldClasses =
    "w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition";

  const buttonClasses =
    "inline-flex items-center justify-center rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition";

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Admin Panel
      </h1>

      {/* Project Management */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Project Management
        </h2>
        <form
          onSubmit={addProject}
          className="bg-white rounded-xl shadow-md border border-gray-200 p-5 space-y-4"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Project Image URL
              </label>
              <input
                name="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={projectForm.imageUrl}
                onChange={handleProjectChange}
                required
                className={fieldClasses}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Project Name
              </label>
              <input
                name="name"
                placeholder="AI-based Attendance System"
                value={projectForm.name}
                onChange={handleProjectChange}
                required
                className={fieldClasses}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Project Description
            </label>
            <textarea
              name="description"
              placeholder="Short description about the project..."
              value={projectForm.description}
              onChange={handleProjectChange}
              required
              className={`${fieldClasses} min-h-[80px]`}
            />
          </div>

          <button type="submit" className={buttonClasses}>
            Add Project
          </button>
        </form>
      </section>

      {/* Client Management */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Client Management
        </h2>
        <form
          onSubmit={addClient}
          className="bg-white rounded-xl shadow-md border border-gray-200 p-5 space-y-4"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Client Image URL
              </label>
              <input
                name="imageUrl"
                placeholder="https://example.com/client.jpg"
                value={clientForm.imageUrl}
                onChange={handleClientChange}
                required
                className={fieldClasses}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Client Name
              </label>
              <input
                name="name"
                placeholder="John Doe"
                value={clientForm.name}
                onChange={handleClientChange}
                required
                className={fieldClasses}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Client Description
              </label>
              <textarea
                name="description"
                placeholder="Client feedback..."
                value={clientForm.description}
                onChange={handleClientChange}
                required
                className={`${fieldClasses} min-h-[80px]`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Designation
              </label>
              <input
                name="designation"
                placeholder="CEO, TechCorp"
                value={clientForm.designation}
                onChange={handleClientChange}
                required
                className={fieldClasses}
              />
            </div>
          </div>

          <button type="submit" className={buttonClasses}>
            Add Client
          </button>
        </form>
      </section>

      {/* Contact Form Details */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold text-gray-900">
            Contact Form Responses
          </h2>
          <button
            onClick={fetchAdminData}
            className="text-xs font-medium text-indigo-500 hover:text-indigo-600"
          >
            Refresh
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 font-medium text-gray-600">
                  Full Name
                </th>
                <th className="px-3 py-2 font-medium text-gray-600">
                  Email
                </th>
                <th className="px-3 py-2 font-medium text-gray-600">
                  Mobile
                </th>
                <th className="px-3 py-2 font-medium text-gray-600">
                  City
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c._id} className="border-t border-gray-100">
                  <td className="px-3 py-2">{c.fullName}</td>
                  <td className="px-3 py-2">{c.email}</td>
                  <td className="px-3 py-2">{c.mobile}</td>
                  <td className="px-3 py-2">{c.city}</td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-3 py-4 text-center text-gray-500 text-xs"
                  >
                    No contact submissions yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Subscribed Emails */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold text-gray-900">
            Subscribed Email Addresses
          </h2>
          <button
            onClick={fetchAdminData}
            className="text-xs font-medium text-indigo-500 hover:text-indigo-600"
          >
            Refresh
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
          {subscribers.length === 0 ? (
            <p className="text-xs text-gray-500">
              No subscribers yet. Ask users to subscribe from the landing page.
            </p>
          ) : (
            <ul className="space-y-1 text-sm">
              {subscribers.map((s) => (
                <li key={s._id} className="flex justify-between">
                  <span>{s.email}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
