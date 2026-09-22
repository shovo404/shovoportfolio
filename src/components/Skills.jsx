import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { useContent } from '../context/ContentContext';
import { getIcon } from '../lib/icons';
import TiltCard from './TiltCard';

export default function Skills() {
  const content = useContent();
  const skills = content?.skills || [];

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Skills"
          title="A layered stack spanning AI, frontend systems, and practical tooling."
          subtitle="The cards below are intentionally interactive, with skill bars to communicate depth and breadth across the stack."
        />

        <div className="grid gap-6 xl:grid-cols-3">
          {skills.map((group, groupIndex) => {
            const GroupIcon = getIcon(group.icon);
            return (
              <TiltCard key={group.category} maxTilt={6} className="h-full">
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: groupIndex * 0.1 }}
                  className="glass card-hover rounded-[28px] p-6 h-full"
                >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-white/5 text-xl text-cyan-200">
                    <GroupIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{group.category}</h3>
                    <p className="text-sm text-slate-400">Interactive skill profile</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {group.items.map((item) => {
                    const ItemIcon = getIcon(item.icon);
                    return (
                      <div key={item.name}>
                        <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                          <div className="flex items-center gap-2">
                            <ItemIcon className="text-cyan-200" />
                            <span>{item.name}</span>
                          </div>
                          <span>{item.level}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/8">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.level}%` }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400"
                          />
                        </div>
                      </div>
                    );
                  })}
</div>
                  </motion.article>
                </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
