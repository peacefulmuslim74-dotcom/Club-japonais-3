import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, RefreshCw, Send, Sliders, Copy, PlusCircle, CheckCircle2 } from 'lucide-react';
import { Product, StoreSettings } from '../types';

interface AIProductStudioProps {
  products: Product[];
  settings: StoreSettings;
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (product: Product) => void;
  selectedProductId?: string;
}

export const AIProductStudio: React.FC<AIProductStudioProps> = ({
  products,
  settings,
  onUpdateProduct,
  onAddProduct,
  selectedProductId,
}) => {
  const [activeProductId, setActiveProductId] = useState<string>(
    selectedProductId || (products[0] ? products[0].id : '')
  );
  const [task, setTask] = useState<'product_description' | 'ad_copy' | 'seo_optimize' | 'pricing_strategy'>('product_description');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any | null>(null);
  const [appliedFeedback, setAppliedFeedback] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const currentProduct = products.find((p) => p.id === activeProductId);

  const presets = [
    'Elevate tone to architectural luxury, minimalist and tactile',
    'Highlight ergonomic wellness and spinal relief for 10-hour desk sessions',
    'Focus on acoustic engineering and lossless audio fidelity',
    'Write high-converting urgency for limited artisan batch release',
  ];

  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    setAppliedFeedback(false);

    try {
      const promptText = customPrompt || 'Optimize this product for discerning customers who value craftsmanship and minimalism.';
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task,
          prompt: promptText,
          context: currentProduct
            ? {
                name: currentProduct.name,
                category: currentProduct.category,
                price: currentProduct.price,
                costPrice: currentProduct.costPrice,
                description: currentProduct.description,
                features: currentProduct.features,
              }
            : { name: 'New Artisan Concept' },
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Server returned an error');
      }

      setAiResult(json.data);
    } catch (err: any) {
      console.error('Gemini studio error:', err);
      setErrorMsg(err.message || 'Generation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyToProduct = () => {
    if (!currentProduct || !aiResult) return;

    let updated: Product = { ...currentProduct };

    if (task === 'product_description') {
      if (aiResult.headline) updated.name = `${currentProduct.name} - ${aiResult.headline}`;
      if (aiResult.story) updated.story = aiResult.story;
      if (aiResult.bulletPoints && Array.isArray(aiResult.bulletPoints)) {
        updated.features = aiResult.bulletPoints;
      }
      if (aiResult.headline && aiResult.story) {
        updated.description = `${aiResult.story} ${aiResult.materialsAndCare || ''}`;
      }
    } else if (task === 'pricing_strategy') {
      if (aiResult.suggestedPrice && typeof aiResult.suggestedPrice === 'number') {
        updated.price = aiResult.suggestedPrice;
      }
      if (aiResult.anchoredRetailPrice && typeof aiResult.anchoredRetailPrice === 'number') {
        updated.compareAtPrice = aiResult.anchoredRetailPrice;
      }
    }

    onUpdateProduct(updated);
    setAppliedFeedback(true);
    setTimeout(() => setAppliedFeedback(false), 2500);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-850">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gemini 3.8 Merchandising Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            AI Product & Marketing Studio
          </h1>
          <p className="text-xs text-neutral-400 mt-1 font-light">
            Generate high-converting copy, multi-channel ad copy, SEO tags, and pricing strategy via Google Gemini.
          </p>
        </div>

        {/* Product Picker */}
        <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-xl p-1.5 text-xs">
          <label className="text-neutral-400 pl-2">Target Product:</label>
          <select
            value={activeProductId}
            onChange={(e) => {
              setActiveProductId(e.target.value);
              setAiResult(null);
            }}
            className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none cursor-pointer max-w-xs"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({settings.currencySymbol}{p.price})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Prompt & Configurations */}
        <div className="lg:col-span-5 space-y-6">
          {/* Task selector tabs */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-3">
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
              Select Merchandising Objective
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTask('product_description')}
                className={`p-3 text-left rounded-lg border text-xs font-medium transition-colors ${
                  task === 'product_description'
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-200'
                    : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <div className="font-semibold text-white">Product Story & Specs</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">Narrative & benefits</div>
              </button>

              <button
                type="button"
                onClick={() => setTask('ad_copy')}
                className={`p-3 text-left rounded-lg border text-xs font-medium transition-colors ${
                  task === 'ad_copy'
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-200'
                    : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <div className="font-semibold text-white">Ad Campaign Suite</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">Meta, TikTok & Google</div>
              </button>

              <button
                type="button"
                onClick={() => setTask('seo_optimize')}
                className={`p-3 text-left rounded-lg border text-xs font-medium transition-colors ${
                  task === 'seo_optimize'
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-200'
                    : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <div className="font-semibold text-white">Search SEO & Meta</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">Keywords & ranking</div>
              </button>

              <button
                type="button"
                onClick={() => setTask('pricing_strategy')}
                className={`p-3 text-left rounded-lg border text-xs font-medium transition-colors ${
                  task === 'pricing_strategy'
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-200'
                    : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <div className="font-semibold text-white">Margin & Pricing</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">Bundles & tiering</div>
              </button>
            </div>
          </div>

          {/* Prompt input and Presets */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                Custom Direction or Audience Angle
              </label>
              <textarea
                rows={3}
                placeholder="E.g., Emphasize zero-distraction focus, sustainable walnut timber, and tactile click response..."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-700"
              />
            </div>

            <div>
              <span className="text-[11px] text-neutral-400 block mb-2 font-mono">Quick Angle Presets:</span>
              <div className="space-y-1.5">
                {presets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCustomPrompt(preset)}
                    className="w-full text-left text-[11px] text-neutral-400 hover:text-white bg-neutral-950/60 hover:bg-neutral-800/60 border border-neutral-850 rounded-md px-2.5 py-1.5 transition-colors line-clamp-1"
                  >
                    "{preset}"
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                isLoading
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  : 'bg-white hover:bg-neutral-200 text-neutral-950 shadow-md'
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing Copy with Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Generate Merchandising Intelligence</span>
                </>
              )}
            </button>

            {errorMsg && (
              <p className="text-xs text-red-400 bg-red-950/40 border border-red-900/60 p-2.5 rounded-lg">
                {errorMsg}
              </p>
            )}
          </div>

          {/* Active Product Preview Card */}
          {currentProduct && (
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 flex gap-4 items-center">
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                className="w-16 h-16 rounded-lg object-cover bg-neutral-950 shrink-0 border border-neutral-800"
              />
              <div className="text-xs">
                <span className="text-[11px] text-neutral-400 font-mono uppercase">
                  {currentProduct.category} · Stock: {currentProduct.stock}
                </span>
                <h4 className="font-semibold text-white mt-0.5 line-clamp-1">
                  {currentProduct.name}
                </h4>
                <div className="font-mono text-neutral-300 mt-1">
                  Current Retail: {settings.currencySymbol}{currentProduct.price}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: AI Output & Integration */}
        <div className="lg:col-span-7">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 min-h-[480px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    Intelligence Output
                  </h3>
                </div>

                {aiResult && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleApplyToProduct}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        appliedFeedback
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-400 hover:bg-amber-300 text-neutral-950'
                      }`}
                    >
                      {appliedFeedback ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Applied to Catalog!</span>
                        </>
                      ) : (
                        <>
                          <PlusCircle className="w-3.5 h-3.5" />
                          <span>Apply to Catalog</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="mt-6">
                {!aiResult && !isLoading && (
                  <div className="py-24 text-center text-neutral-500">
                    <Sparkles className="w-8 h-8 text-neutral-700 mx-auto mb-3" />
                    <p className="text-sm text-neutral-400">
                      Configure your prompt on the left and click "Generate Merchandising Intelligence".
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      Gemini 3.8 Flash will produce structured copy ready for instantaneous catalog deployment.
                    </p>
                  </div>
                )}

                {isLoading && (
                  <div className="py-24 text-center space-y-4">
                    <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
                    <p className="text-xs text-neutral-300 font-mono">
                      Querying Gemini 3.8 Flash model on backend proxy...
                    </p>
                  </div>
                )}

                {aiResult && !isLoading && (
                  <div className="space-y-6 text-xs">
                    {/* Render according to task */}
                    {task === 'product_description' && (
                      <div className="space-y-4">
                        {aiResult.headline && (
                          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                            <div className="flex justify-between items-center text-neutral-500 text-[11px] mb-1 font-mono">
                              <span>HEADLINE HOOK</span>
                              <button
                                onClick={() => copyToClipboard(aiResult.headline, 'headline')}
                                className="hover:text-white"
                              >
                                {copiedKey === 'headline' ? 'Copied' : <Copy className="w-3 h-3" />}
                              </button>
                            </div>
                            <p className="text-base font-semibold text-white">
                              {aiResult.headline}
                            </p>
                          </div>
                        )}

                        {aiResult.story && (
                          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                            <div className="flex justify-between items-center text-neutral-500 text-[11px] mb-1 font-mono">
                              <span>EMOTIONAL POSITIONING</span>
                              <button
                                onClick={() => copyToClipboard(aiResult.story, 'story')}
                                className="hover:text-white"
                              >
                                {copiedKey === 'story' ? 'Copied' : <Copy className="w-3 h-3" />}
                              </button>
                            </div>
                            <p className="text-neutral-300 leading-relaxed font-light">
                              {aiResult.story}
                            </p>
                          </div>
                        )}

                        {aiResult.bulletPoints && (
                          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                            <div className="text-neutral-500 text-[11px] mb-2 font-mono">
                              CONVERTING BENEFIT BULLETS
                            </div>
                            <ul className="space-y-2 text-neutral-200">
                              {aiResult.bulletPoints.map((b: string, i: number) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-amber-400">•</span>
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {aiResult.materialsAndCare && (
                          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                            <div className="text-neutral-500 text-[11px] mb-1 font-mono">
                              MATERIALS & INTEGRITY
                            </div>
                            <p className="text-neutral-400 font-light">{aiResult.materialsAndCare}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {task === 'ad_copy' && (
                      <div className="space-y-4">
                        {aiResult.metaAd && (
                          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                            <div className="text-neutral-500 text-[11px] mb-1 font-mono">
                              META / INSTAGRAM FEED AD
                            </div>
                            <p className="text-neutral-300 mb-2 leading-relaxed">
                              {aiResult.metaAd.primaryText}
                            </p>
                            <div className="p-2.5 bg-neutral-900 rounded-lg text-white font-semibold flex justify-between items-center">
                              <span>{aiResult.metaAd.headline}</span>
                              <span className="text-xs bg-white text-neutral-950 px-2 py-0.5 rounded font-mono">
                                {aiResult.metaAd.callToAction || 'Shop Now'}
                              </span>
                            </div>
                          </div>
                        )}

                        {aiResult.googleSearch && (
                          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                            <div className="text-neutral-500 text-[11px] mb-1 font-mono">
                              GOOGLE SEARCH RESPONSIVE AD
                            </div>
                            <div className="text-blue-400 font-medium text-sm mb-1">
                              {aiResult.googleSearch.headline1} | {aiResult.googleSearch.headline2}
                            </div>
                            <p className="text-neutral-400">{aiResult.googleSearch.description}</p>
                          </div>
                        )}

                        {aiResult.tiktokHook && (
                          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                            <div className="text-neutral-500 text-[11px] mb-1 font-mono">
                              TIKTOK 3-SEC CREATOR HOOK
                            </div>
                            <p className="text-amber-300 italic font-mono">
                              "{aiResult.tiktokHook}"
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {task === 'seo_optimize' && (
                      <div className="space-y-4">
                        <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                          <div className="text-neutral-500 text-[11px] mb-1 font-mono">
                            TITLE TAG ({aiResult.metaTitle?.length || 0} / 60 chars)
                          </div>
                          <p className="text-white font-semibold">{aiResult.metaTitle}</p>
                        </div>

                        <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                          <div className="text-neutral-500 text-[11px] mb-1 font-mono">
                            META DESCRIPTION ({aiResult.metaDescription?.length || 0} / 155 chars)
                          </div>
                          <p className="text-neutral-300">{aiResult.metaDescription}</p>
                        </div>

                        {aiResult.targetKeywords && (
                          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                            <div className="text-neutral-500 text-[11px] mb-2 font-mono">
                              HIGH-INTENT KEYWORDS
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {aiResult.targetKeywords.map((kw: string, i: number) => (
                                <span
                                  key={i}
                                  className="text-xs text-neutral-300 font-mono bg-neutral-900 border border-neutral-800 px-2 py-1 rounded"
                                >
                                  {kw}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {task === 'pricing_strategy' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                            <span className="text-[11px] text-neutral-500 font-mono">
                              RECOMMENDED PRICE
                            </span>
                            <div className="text-xl font-bold text-white mt-1">
                              {settings.currencySymbol}{aiResult.suggestedPrice}
                            </div>
                          </div>
                          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                            <span className="text-[11px] text-neutral-500 font-mono">
                              ANCHOR COMPARE PRICE
                            </span>
                            <div className="text-xl font-bold text-neutral-400 mt-1 line-through">
                              {settings.currencySymbol}{aiResult.anchoredRetailPrice}
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                          <div className="text-neutral-500 text-[11px] mb-1 font-mono">
                            GROSS MARGIN INSIGHT
                          </div>
                          <p className="text-neutral-300 leading-relaxed">
                            {aiResult.grossMarginAnalysis}
                          </p>
                        </div>

                        <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                          <div className="text-neutral-500 text-[11px] mb-1 font-mono">
                            BUNDLE ARCHITECTURE
                          </div>
                          <p className="text-amber-200">{aiResult.bundleIdea}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom notification */}
            <div className="pt-4 border-t border-neutral-800 text-[11px] text-neutral-500 flex items-center justify-between font-mono">
              <span>Model: gemini-3.8-flash</span>
              <span>Direct Catalog Integration: Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
