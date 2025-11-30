import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { lists as initialLists, CURRENT_USER_ID } from "../data";
import "../styles/listOverview.css";

export default function ListOverviewPage() {
  const [lists, setLists] = useState(initialLists);
  const [filter, setFilter] = useState("active");
  const [newTitle, setNewTitle] = useState("");
  const navigate = useNavigate();

  const visibleLists = useMemo(() => {
    if (filter === "active") return lists.filter((l) => l.status === "active");
    if (filter === "archived")
      return lists.filter((l) => l.status === "archived");
    return lists;
  }, [lists, filter]);

  const activeCount = lists.filter((l) => l.status === "active").length;
  const archivedCount = lists.filter((l) => l.status === "archived").length;

  const handleOpen = (id) => {
    navigate(`/lists/${id}`);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) return;

    const newList = {
      id: String(Date.now()),
      title,
      status: "active",
      ownerId: CURRENT_USER_ID,
      items: [],
      members: [{ id: CURRENT_USER_ID, name: "Jan Novák", role: "owner" }],
    };

    setLists((prev) => [...prev, newList]);
    setNewTitle("");
  };

  const handleDelete = (listId) => {
    const list = lists.find((l) => l.id === listId);
    if (!list) return;
    if (list.ownerId !== CURRENT_USER_ID) return;

    const ok = window.confirm(`Opravdu chcete smazat seznam "${list.title}"?`);
    if (!ok) return;

    setLists((prev) => prev.filter((l) => l.id !== listId));
  };

  return (
    <div className="page list-overview-container">
      <header className="overview-header">
        <h1>Seznamy</h1>
        <div className="overview-stats">
          <span>Aktivní: {activeCount}</span>
          <span>Archivované: {archivedCount}</span>
        </div>
      </header>

      <section className="overview-controls">
        <label>
          Filtrovat:{" "}
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="active">Jen nearchivované</option>
            <option value="all">Vše (včetně archivovaných)</option>
            <option value="archived">Jen archivované</option>
          </select>
        </label>

        <form className="new-list-form" onSubmit={handleCreate}>
          <input
            placeholder="Název nového seznamu…"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button type="submit">Přidat seznam</button>
        </form>
      </section>

      <section className="list-grid">
        {visibleLists.map((list) => {
          const isOwner = list.ownerId === CURRENT_USER_ID;
          const resolvedCount = list.items.filter((i) => i.resolved).length;

          return (
            <article key={list.id} className={`list-tile ${list.status}`}>
              <h2>{list.title}</h2>

              <p>
                Položky: {resolvedCount}/{list.items.length}
              </p>
              <p>Členové: {list.members.length}</p>
              <p className="list-status">
                Stav: {list.status === "archived" ? "archivovaný" : "aktivní"}
              </p>

              <div className="tile-actions">
                <button onClick={() => handleOpen(list.id)}>Otevřít</button>
                {isOwner && (
                  <button
                    type="button"
                    className="danger"
                    onClick={() => handleDelete(list.id)}
                  >
                    Smazat
                  </button>
                )}
              </div>
            </article>
          );
        })}

        {visibleLists.length === 0 && (
          <p>Pro zvolený filtr nejsou žádné seznamy.</p>
        )}
      </section>
    </div>
  );
}
