import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';

interface KnowledgeGraphProps {
  data: {
    nodes: any[];
    links: any[];
  };
}

const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ data }) => {
  return (
    <div className="w-full h-[600px] bg-white rounded-lg shadow-lg">
      <ForceGraph2D
        graphData={data}
        nodeLabel="id"
        nodeAutoColorBy="group"
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
      />
    </div>
  );
};

export default KnowledgeGraph;