"use client";

import React, { useState } from "react";

const GradingUI: React.FC = () => {
  // State management for inputs
  const [files, setFiles] = useState<File[]>([]);
  const [rubric, setRubric] = useState<string>("");
  const [rubricFile, setRubricFile] = useState<File | null>(null);
  const [threshold, setThreshold] = useState({
    relevance: 0.5,
    grammar: 0.5,
    structure: 0.5,
    depth: 0.5,
  });
  const [weightage, setWeightage] = useState({
    relevance: 0.25,
    grammar: 0.25,
    structure: 0.25,
    depth: 0.25,
  });

  // Handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(e.target.files)]);
    }
  };

  const handleRubricFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setRubricFile(e.target.files[0]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const removeRubricFile = () => {
    setRubricFile(null);
  };

  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>, section: string) => {
    setThreshold({
      ...threshold,
      [section]: parseFloat(e.target.value),
    });
  };

  const handleWeightageChange = (e: React.ChangeEvent<HTMLInputElement>, section: string) => {
    setWeightage({
      ...weightage,
      [section]: parseFloat(e.target.value),
    });
  };

  const handleAnalyze = () => {
    // Call LangGraph API or backend process here
    console.log("Analyzing", { files, rubric, rubricFile, threshold, weightage });
  };

  const handleReset = () => {
    setFiles([]);
    setRubric("");
    setRubricFile(null);
    setThreshold({
      relevance: 0.5,
      grammar: 0.5,
      structure: 0.5,
      depth: 0.5,
    });
    setWeightage({
      relevance: 0.25,
      grammar: 0.25,
      structure: 0.25,
      depth: 0.25,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex justify-center items-center">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-5xl ">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Paper Grading System</h2>

        {/* Grid Layout with 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 justify-between" style={{ gridTemplateColumns: "50% 22% 22%" }}>
          {/* First Column: Papers and Rubric Section (larger column) */}
          <div className="p-4">
            {/* Paper upload section */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-300">Upload Papers:</label>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              {files.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <li key={index} className="flex justify-between text-sm text-gray-400">
                      {file.name}
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-400 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Rubric section */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-300">Rubric (Text or File):</label>
              <textarea
                value={rubric}
                onChange={(e) => setRubric(e.target.value)}
                placeholder="Enter grading rubric here"
                className="w-full p-2.5 bg-gray-700 rounded-lg border border-gray-600 text-gray-100 placeholder-gray-400 mb-4"
                rows={4}
              />
              <input
                type="file"
                onChange={handleRubricFileUpload}
                className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              {rubricFile && (
                <div className="mt-4 flex justify-between text-sm text-gray-400">
                  {rubricFile.name}
                  <button onClick={removeRubricFile} className="text-red-400 hover:text-red-600">
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Second Column: Threshold Section (smaller column) */}
          <div>
            <div className="p-4 bg-gray-700 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-4">Threshold Levels</h3>
              {["relevance", "grammar", "structure", "depth"].map((section) => (
                <div key={section} className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-300">
                    {section.charAt(0).toUpperCase() + section.slice(1)}:
                  </label>
                  <div className="flex justify-between"> 
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={threshold[section as keyof typeof threshold]}
                    onChange={(e) => handleThresholdChange(e, section)}
                    className="w-3/4"
                    />
                  <span className="text-gray-300 text-sm">{threshold[section as keyof typeof threshold]}</span>
                    </div>
                </div>
              ))}
            </div>
          </div>

          {/* Third Column: Weightage Section (smaller column) */}
          <div>
            <div className="p-4 bg-gray-700 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-4">Weightage Selection</h3>
              {["relevance", "grammar", "structure", "depth"].map((section) => (
                <div key={section} className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-300">
                    {section.charAt(0).toUpperCase() + section.slice(1)} Weightage:
                  </label>
                  <div className="flex justify-between">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={weightage[section as keyof typeof weightage]}
                    onChange={(e) => handleWeightageChange(e, section)}
                    className="w-3/4"
                  />
                  <span className="text-gray-300 text-sm">{weightage[section as keyof typeof weightage]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analyze and Reset buttons */}
        <div className="flex mt-8">
          <button
            onClick={handleAnalyze}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Analyze
          </button>
          <button
            onClick={handleReset}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default GradingUI;
