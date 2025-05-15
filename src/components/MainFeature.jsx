import { motion } from 'framer-motion';

const MainFeature = () => {
  return (
    <motion.div 
      className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">List Your Property with EstateVue</h3>
          <p className="text-surface-600 dark:text-surface-400 mb-6">
            Reach thousands of potential buyers or renters. Our platform makes it easy to showcase your property with professional-looking listings.
          </p>
          <button className="btn btn-primary self-start">Create Listing</button>
        </div>
        <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Real estate agent with client" className="w-full h-full object-cover aspect-auto md:aspect-auto" />
      </div>
    </motion.div>
  );
};

export default MainFeature;