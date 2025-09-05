import { NavLink, Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import appIconUrl from "../assets/Icon.svg";
import titleIconUrl from "../assets/Icontitle.svg";
import { useAuth } from "../context/AuthContext";

function Header() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <header className={styles.Header}>
      <div className={styles.container}>
        <div className={styles.appIcon}>
          <img src={appIconUrl} alt="App Icon" className={styles.icon} />
          <img src={titleIconUrl} alt="Title Icon" className={styles.icon} />
        </div>

        <nav className={styles.navigator}>
          <NavLink
            to="/policies"
            className={({ isActive }) =>
              isActive
                ? `${styles.navigatorItem} ${styles.activeNavItem}`
                : styles.navigatorItem
            }
          >
            정책보기
          </NavLink>
          <NavLink
            to="/community"
            className={({ isActive }) =>
              isActive
                ? `${styles.navigatorItem} ${styles.activeNavItem}`
                : styles.navigatorItem
            }
          >
            커뮤니티
          </NavLink>
          <NavLink
            to="/report"
            className={({ isActive }) =>
              isActive
                ? `${styles.navigatorItem} ${styles.activeNavItem}`
                : styles.navigatorItem
            }
          >
            레포트
          </NavLink>
        </nav>

        <div className={styles.user}>
          {user ? (
            <div>
              <span>{user}님</span>
            </div>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
