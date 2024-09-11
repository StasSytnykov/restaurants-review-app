import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user.tsx";
import { Button } from "@/components/ui/button.tsx";

export const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore((state) => state);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-gray-800 text-white mb-6">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          My App
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            {/*<li>*/}
            {/*  <Link to="/protected" className="hover:text-gray-300">*/}
            {/*    Protected*/}
            {/*  </Link>*/}
            {/*</li>*/}
          </ul>
        </nav>
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span>Welcome, {user.userName}</span>
              <Button onClick={handleLogout} variant="destructive">
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Button asChild variant="secondary">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
