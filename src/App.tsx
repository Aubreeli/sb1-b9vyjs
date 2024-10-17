import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import FileUploader from './components/FileUploader';
import KnowledgeGraph from './components/KnowledgeGraph';
import { processWordDocument } from './utils/documentProcessor';

function App() {
  const [graphData, setGraphData] = useState<{ nodes: any[], links: any[] } | null>(null);

  const handleFileUpload = async (file: File) => {
    try {
      const processedData = await processWordDocument(file);
      setGraphData(processedData);
    } catch (error) {
      console.error('Error processing document:', error);
      alert('文件处理出错，请重试。');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">知识图谱生成器</h1>
      <FileUploader onFileUpload={handleFileUpload} />
      {graphData ? (
        <div className="w-full max-w-4xl mt-8">
          <KnowledgeGraph data={graphData} />
        </div>
      ) : (
        <div className="mt-8 text-gray-600">
          <Upload size={48} className="mx-auto mb-4" />
          <p>上传Word文件以生成知识图谱</p>
        </div>
      )}
    </div>
  );
}

export default App;