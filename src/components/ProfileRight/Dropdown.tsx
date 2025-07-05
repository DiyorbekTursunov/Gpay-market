import { useState } from 'react';
import styles from './ProfileRight.module.scss';

interface DropdownProps {
  header: string;
  children: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ header, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${styles.dropdown} ${open ? styles.active : ''}`}>
      <button
        className={styles.dropdownHeader}
        onClick={() => setOpen((o) => !o)}
      >
        {header}
        <span className={styles.iconBg}></span>
      </button>
      <div className={styles.dropdownContent}>{children}</div>
    </div>
  );
};
