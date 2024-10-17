import mammoth from 'mammoth';

export async function processWordDocument(file: File): Promise<{ nodes: any[], links: any[] }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const result = await mammoth.extractRawText({ arrayBuffer });
        const text = result.value;

        // 这里是一个简单的示例，实际的知识图谱生成算法会更复杂
        const words = text.split(/\s+/).filter(word => word.length > 3);
        const uniqueWords = Array.from(new Set(words));

        const nodes = uniqueWords.map(word => ({ id: word, group: 1 }));
        const links = [];

        for (let i = 0; i < words.length - 1; i++) {
          links.push({
            source: words[i],
            target: words[i + 1],
            value: 1
          });
        }

        resolve({ nodes, links });
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}