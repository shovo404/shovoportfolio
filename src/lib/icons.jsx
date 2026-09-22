import {
  FaBrain, FaGithub, FaLinkedinIn, FaEnvelope, FaGlobe, FaRobot,
} from 'react-icons/fa';
import {
  SiReact, SiTailwindcss, SiPython, SiTensorflow,
  SiJavascript, SiWordpress,
} from 'react-icons/si';
import {
  FiMail, FiBriefcase, FiUsers, FiBookOpen, FiAward, FiCode,
} from 'react-icons/fi';

// All icons selectable from the admin panel, keyed by name string.
export const ICON_MAP = {
  FaBrain,
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaGlobe,
  FaRobot,
  SiReact,
  SiTailwindcss,
  SiPython,
  SiTensorflow,
  SiJavascript,
  SiWordpress,
  FiMail,
  FiBriefcase,
  FiUsers,
  FiBookOpen,
  FiAward,
  FiCode,
};

export const ICON_OPTIONS = Object.keys(ICON_MAP);

export function getIcon(name, fallback = FaGlobe) {
  return ICON_MAP[name] || fallback;
}
