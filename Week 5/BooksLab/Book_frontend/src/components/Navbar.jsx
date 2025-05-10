function Navbar({ currentTab, setTab }) {
  return (
      <nav className="navbar">
        <button className={currentTab === 'list' ? 'active' : ''} onClick={() => setTab('list')}>
          All Books
        </button>
        <button className={currentTab === 'add' ? 'active' : ''} onClick={() => setTab('add')}>
          Add Book
        </button>
        <button className={currentTab === 'edit' ? 'active' : ''} onClick={() => setTab('edit')}>
          Edit Book
        </button>
      </nav>
  );
}

export default Navbar;
