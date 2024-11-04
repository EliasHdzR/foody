import Dropdown from "@/Components/Dropdown.jsx";

function Navbar() {
    return (
        <div className="navbar flex items-center justify-between p-4 shadow-sm bg-white">
            <h2 className="text-xl font-semibold text-gray-800">foody</h2>
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Buscar"
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none"
                />
                <button className="text-gray-600 hover:text-gray-800">
                    <i className="icon-bell"></i> {/**aun no está */}
                </button>
                <div className="w-10 h-10 rounded-full">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <button type="button"
                                    className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                >
                                    <img src="https://cdn-icons-png.flaticon.com/512/63/63699.png" alt="Perfil" className="w-full h-full object-cover" />
                                </button>
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link
                                href={route('profile.edit')}
                            >
                                Profile
                            </Dropdown.Link>
                            <Dropdown.Link
                                href={route('logout')}
                                method="post"
                                as="button"
                            >
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
