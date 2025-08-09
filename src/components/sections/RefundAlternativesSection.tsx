'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Star,
  Shield,
  Zap,
  Crown,
  Calendar,
  Phone,
  CheckCircle,
  Gift,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface RefundAlternativesSectionProps {
  className?: string;
}

export function RefundAlternativesSection({
  className = '',
}: RefundAlternativesSectionProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundChecks, setRefundChecks] = useState({
    agreement: false,
    noDefamation: false,
    compliance: false,
  });

  const upgradeOptions = [
    {
      title: 'Priority VIP Processing',
      description: 'Fast-track your application with dedicated case manager',
      discount: '50% OFF',
      icon: Zap,
      color: 'text-gray-300',
      bgColor: 'from-gray-800/20 to-gray-900/10',
    },
    {
      title: 'Executive Consultation Package',
      description: '1-on-1 strategy session with senior immigration attorney',
      discount: 'FREE',
      icon: Crown,
      color: 'text-purple-400',
      bgColor: 'from-purple-500/20 to-purple-600/10',
    },
    {
      title: 'Global Elite Program',
      description: 'Access to exclusive visa routes and priority countries',
      discount: 'Limited Time',
      icon: Star,
      color: 'text-blue-400',
      bgColor: 'from-blue-500/20 to-blue-600/10',
    },
    {
      title: 'Flexible Payment Plan',
      description: 'Split your investment over 12 months with 0% interest',
      discount: 'No Fees',
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'from-green-500/20 to-green-600/10',
    },
  ];

  const allChecked = Object.values(refundChecks).every(Boolean);

  return (
    <>
      <section className={`py-24 relative ${className}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Premium Section Header */}
            <div className="mb-16">
              <Badge className="mb-6 px-6 py-2 bg-gradient-to-r from-red-500/20 to-red-600/10 border border-red-500/30 text-red-300">
                <Gift className="w-4 h-4 mr-2" />
                Special Client Privileges
              </Badge>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                Having second thoughts?
              </h2>
              <p className="text-xl text-red-200/80 mb-4">
                Let&apos;s find your best way forward
              </p>
              <p className="text-red-300/60 max-w-2xl mx-auto">
                We believe in your success. Explore exclusive upgrades or learn
                about our transparent refund process.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Explore Better Programs Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className="streamit-card premium-glow group cursor-pointer"
                  onClick={() => setShowUpgradeModal(true)}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-500/30">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Explore Better Programs
                    </h3>
                    <p className="text-red-200/80 mb-6">
                      Unlock exclusive upgrades, special discounts, and premium
                      consultation options tailored just for you.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-red-400">
                      <Crown className="w-5 h-5" />
                      <span className="font-semibold">
                        VIP Access Available
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Request Refund Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className="streamit-card group cursor-pointer border-red-800/20"
                  onClick={() => setShowRefundModal(true)}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-800/50 to-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Shield className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Request Refund
                    </h3>
                    <p className="text-red-200/60 mb-6">
                      Understand our transparent refund process and policy
                      terms. We&apos;re committed to fairness and clarity.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-red-400/70">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Transparent Process</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upgrade Modal */}
      <AnimatePresence>
        {showUpgradeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowUpgradeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="luxury-modal rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white">
                        Don&apos;t miss out! Unlock your special client
                        privileges.
                      </h2>
                      <p className="text-red-200/80 mt-2">
                        Exclusive upgrades available only to valued clients like
                        you
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowUpgradeModal(false)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Upgrade Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {upgradeOptions.map((option, index) => (
                    <motion.div
                      key={option.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="streamit-card premium-glow h-full">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div
                              className={`w-12 h-12 bg-gradient-to-br ${option.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
                            >
                              <option.icon
                                className={`w-6 h-6 ${option.color}`}
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h3 className="text-lg font-bold text-white">
                                  {option.title}
                                </h3>
                                <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                                  {option.discount}
                                </Badge>
                              </div>
                              <p className="text-red-200/70 text-sm leading-relaxed">
                                {option.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="streamit-button premium-glow px-8 py-3 text-lg">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Free Consultation
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-600 text-red-300 hover:bg-red-500/10 px-8 py-3 text-lg"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Premium Support
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Refund Modal */}
      <AnimatePresence>
        {showRefundModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowRefundModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="luxury-modal rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-red-400" />
                    <h2 className="text-2xl font-bold text-white">
                      Refund Request Process
                    </h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowRefundModal(false)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Refund Policy */}
                <Card className="streamit-card mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      Our Refund Policy
                    </h3>
                    <p className="text-red-200/80 leading-relaxed">
                      Refunds are processed only as per our service agreement
                      and applicable court decisions. We maintain the highest
                      standards of transparency and fairness in all our
                      dealings.
                    </p>
                  </CardContent>
                </Card>

                {/* Acknowledgment Checkboxes */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Please acknowledge the following to proceed:
                  </h3>

                  <div className="space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox
                        checked={refundChecks.agreement}
                        onCheckedChange={checked =>
                          setRefundChecks(prev => ({
                            ...prev,
                            agreement: !!checked,
                          }))
                        }
                        className="mt-1"
                      />
                      <span className="text-red-200/80 leading-relaxed">
                        I acknowledge that refund eligibility is determined as
                        per our service agreement and/or court decisions.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox
                        checked={refundChecks.noDefamation}
                        onCheckedChange={checked =>
                          setRefundChecks(prev => ({
                            ...prev,
                            noDefamation: !!checked,
                          }))
                        }
                        className="mt-1"
                      />
                      <span className="text-red-200/80 leading-relaxed">
                        I confirm that I have not, and will not, post negative
                        or defamatory content about LINAK services.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox
                        checked={refundChecks.compliance}
                        onCheckedChange={checked =>
                          setRefundChecks(prev => ({
                            ...prev,
                            compliance: !!checked,
                          }))
                        }
                        className="mt-1"
                      />
                      <span className="text-red-200/80 leading-relaxed">
                        I agree that any violation of the above terms will void
                        my refund eligibility.
                      </span>
                    </label>
                  </div>
                </div>

                {/* Support Message */}
                <Card className="streamit-card mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Gift className="w-5 h-5 text-red-400" />
                      Your Experience Matters
                    </h3>
                    <p className="text-red-200/80 leading-relaxed">
                      Before proceeding with a refund, please consider
                      contacting our support team. We&apos;re always here to
                      address your concerns and find the best solution for your
                      journey.
                    </p>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    className="streamit-button premium-glow flex-1"
                    disabled={!allChecked}
                  >
                    <Shield className="w-5 h-5 mr-2" />
                    Submit Refund Request
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-600 text-red-300 hover:bg-red-500/10 flex-1"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Support First
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
