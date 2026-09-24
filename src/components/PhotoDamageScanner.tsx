import React, { useState } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Truck,
  HelpCircle,
  RefreshCw,
  Eye,
} from 'lucide-react';
import { DamageAnalysisData } from '../types';

export const PhotoDamageScanner: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');
  const [userNote, setUserNote] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<DamageAnalysisData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    setImageMimeType(file.type);
    setErrorMsg(null);
    setAnalysisResult(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleLoadSample = () => {
    // High-resolution public sample of damaged vehicle
    const sampleImg =
      'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=800&q=80';
    setSelectedImage(sampleImg);
    setImageMimeType('image/jpeg');
    setUserNote('Front bumper struck while vehicle was stationary at junction. Radiator leaking water.');
    setErrorMsg(null);
    setAnalysisResult(null);
  };

  const runDamageAnalysis = async () => {
    if (!selectedImage) return;

    setIsScanning(true);
    setErrorMsg(null);

    try {
      let base64Payload = selectedImage;

      // If it's an external URL (sample), fetch and convert to base64
      if (selectedImage.startsWith('http')) {
        const resp = await fetch(selectedImage);
        const blob = await resp.blob();
        base64Payload = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      }

      const response = await fetch('/api/ai/analyze-damage-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Payload,
          mimeType: imageMimeType,
          description: userNote,
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || 'Failed to analyze damage photo.');
      }

      setAnalysisResult(resData.data);
    } catch (err: any) {
      console.error('Damage scan error:', err);
      setErrorMsg(err.message || 'Error communicating with AI damage analysis service.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
            <Camera className="w-3.5 h-3.5" />
            <span>Google Gemini 3.8 Multimodal Vision Analysis</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">
            Vehicle Damage & Scene Forensic Scanner
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Upload accident photos to inspect point-of-impact, determine drivability safety, uncover hidden structural risks, and prepare for surveyor queries.
          </p>
        </div>

        <button
          onClick={handleLoadSample}
          className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 text-xs font-semibold transition-colors cursor-pointer self-start md:self-center"
        >
          Load Collision Sample Photo
        </button>
      </div>

      {/* Upload & Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Image Selector & Note */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-xl p-4 text-center transition-colors bg-slate-50/50">
            {selectedImage ? (
              <div className="relative group">
                <img
                  src={selectedImage}
                  alt="Accident Vehicle Damage"
                  className="w-full h-56 object-cover rounded-lg shadow-xs"
                />
                <label className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-opacity rounded-lg text-xs font-semibold gap-1">
                  <Upload className="w-5 h-5" />
                  <span>Click to Change Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center py-10 cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-slate-800">
                  Select or Take Vehicle Damage Photo
                </span>
                <span className="text-xs text-slate-500 mt-1">
                  JPG, PNG, or WebP up to 15MB
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Optional Context / What Happened:
            </label>
            <input
              type="text"
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              placeholder="e.g., Struck by SUV while turning; radiator fluid is dripping"
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-slate-900 bg-white"
            />
          </div>

          <button
            onClick={runDamageAnalysis}
            disabled={!selectedImage || isScanning}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:cursor-not-allowed"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Forensically Analyzing Impact Zone...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Analyze Damage & Drivability</span>
              </>
            )}
          </button>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Right Column: AI Forensic Output */}
        <div className="lg:col-span-7">
          {analysisResult ? (
            <div className="space-y-4">
              {/* Status Header */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-slate-500 block">Identified Impact Zone:</span>
                  <span className="text-sm font-bold text-slate-900">
                    {analysisResult.damageZone}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded text-xs font-bold ${
                      analysisResult.severityRating.includes('Critical')
                        ? 'bg-red-100 text-red-800 border border-red-200'
                        : analysisResult.severityRating.includes('Severe')
                        ? 'bg-amber-100 text-amber-900 border border-amber-200'
                        : 'bg-blue-100 text-blue-900 border border-blue-200'
                    }`}
                  >
                    {analysisResult.severityRating}
                  </span>
                </div>
              </div>

              {/* Drivability Box */}
              <div
                className={`p-4 rounded-xl border flex items-start gap-3 ${
                  analysisResult.drivabilityStatus.isDrivable
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : 'bg-red-50/60 border-red-300'
                }`}
              >
                <Truck
                  className={`w-5 h-5 shrink-0 mt-0.5 ${
                    analysisResult.drivabilityStatus.isDrivable
                      ? 'text-emerald-700'
                      : 'text-red-600'
                  }`}
                />
                <div className="text-xs space-y-1">
                  <span
                    className={`font-bold uppercase tracking-wider block ${
                      analysisResult.drivabilityStatus.isDrivable
                        ? 'text-emerald-900'
                        : 'text-red-900'
                    }`}
                  >
                    Drivability Status:{' '}
                    {analysisResult.drivabilityStatus.isDrivable
                      ? 'Likely Drivable With Caution'
                      : 'DO NOT DRIVE — Flatbed Tow Truck Required'}
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {analysisResult.drivabilityStatus.reasoning}
                  </p>
                  <p className="font-semibold text-slate-900">
                    Recommendation: {analysisResult.drivabilityStatus.recommendation}
                  </p>
                </div>
              </div>

              {/* Visible vs Hidden Damage */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-blue-600" />
                    Visible Damage Items:
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-1 pl-4 list-disc">
                    {analysisResult.visibleDamageItems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    Potential Hidden Damage to Claim:
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-1 pl-4 list-disc">
                    {analysisResult.potentialHiddenDamages.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Surveyor Question Preparation */}
              <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-amber-950">
                  <HelpCircle className="w-4 h-4 text-amber-700" />
                  <span>Anticipated Surveyor Inquiry:</span>
                </div>
                <p className="text-amber-900 leading-relaxed">
                  {analysisResult.surveyorQuestionPreparation}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[220px] rounded-xl border border-dashed border-slate-200 flex flex-col items-center justify-center p-6 text-center text-slate-400">
              <Camera className="w-10 h-10 mb-2 stroke-1" />
              <p className="text-xs font-medium text-slate-600">
                Awaiting Damage Photograph
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5 max-w-sm">
                Upload photos of bumper crumple, doors, windshield, or tire rims to receive an instant forensic report before calling your insurer.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
