import type React from "react"
import Link from "next/link"
import { AlertTriangle, BookOpen, CheckCircle, HelpCircle, Info, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CustomCursor } from "@/components/custom-cursor"

export default function RulesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <CustomCursor />
      <header className="border-b border-zinc-800 bg-zinc-950">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary"></div>
            <span className="text-xl font-bold">KRMU CodeBattle</span>
          </Link>
          <nav className="hidden md:flex md:gap-6">
            <Link href="/contests" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
              Contests
            </Link>
            <Link href="/prizes" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
              Prizes
            </Link>
            <Link href="/contact" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
              Contact Us
            </Link>
            <Link href="/rules" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
              Rules
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="hidden border-zinc-800 text-white hover:bg-zinc-800 hover:text-white md:flex"
            >
              Log In
            </Button>
            <Button className="hidden md:flex">Sign Up</Button>
            <Button size="icon" variant="outline" className="border-zinc-800 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>
      <div className="container px-4 py-6 md:px-6 md:py-12">
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Rules & Guidelines</h1>
          <p className="text-zinc-400">Important information for all KRMU CodeBattle participants</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[3fr_1fr]">
          <div className="space-y-6">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="w-full bg-zinc-950">
                <TabsTrigger value="general" className="flex-1">
                  General Rules
                </TabsTrigger>
                <TabsTrigger value="conduct" className="flex-1">
                  Code of Conduct
                </TabsTrigger>
                <TabsTrigger value="judging" className="flex-1">
                  Judging Criteria
                </TabsTrigger>
                <TabsTrigger value="faq" className="flex-1">
                  FAQ
                </TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="space-y-4 pt-4">
                <Card className="border-zinc-800 bg-zinc-950">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      General Contest Rules
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                      These rules apply to all contests unless otherwise specified
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                      <h3 className="mb-2 font-medium">Eligibility</h3>
                      <ul className="space-y-2 text-zinc-400">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                          <span>All KRMU students are eligible to participate in contests</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                          <span>Some contests may be open to students from other universities as specified</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                          <span>Participants must register with their official university email address</span>
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                      <h3 className="mb-2 font-medium">Participation</h3>
                      <ul className="space-y-2 text-zinc-400">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                          <span>Participants must register before the contest deadline</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                          <span>All submissions must be original work created during the contest period</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                          <span>Participants may use any programming language supported by our platform</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                          <span>External libraries are allowed only if specified in the problem statement</span>
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                      <h3 className="mb-2 font-medium">Prohibited Actions</h3>
                      <ul className="space-y-2 text-zinc-400">
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="mt-0.5 h-4 w-4 text-red-500" />
                          <span>Collaboration with other participants is strictly prohibited unless specified</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="mt-0.5 h-4 w-4 text-red-500" />
                          <span>Sharing solutions or code during the contest period is not allowed</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="mt-0.5 h-4 w-4 text-red-500" />
                          <span>Using AI tools to generate solutions is prohibited unless explicitly allowed</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="mt-0.5 h-4 w-4 text-red-500" />
                          <span>
                            Attempting to hack or disrupt the contest platform will result in disqualification
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                      <h3 className="mb-2 font-medium">Submission Guidelines</h3>
                      <ul className="space-y-2 text-zinc-400">
                        <li className="flex items-start gap-2">
                          <Info className="mt-0.5 h-4 w-4 text-blue-500" />
                          <span>All submissions must be made through the official contest platform</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Info className="mt-0.5 h-4 w-4 text-blue-500" />
                          <span>Submissions after the deadline will not be accepted</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Info className="mt-0.5 h-4 w-4 text-blue-500" />
                          <span>Multiple submissions are allowed, but only the last submission will be evaluated</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Info className="mt-0.5 h-4 w-4 text-blue-500" />
                          <span>Code must be well-documented and include comments explaining the approach</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="conduct" className="space-y-4 pt-4">
                <Card className="border-zinc-800 bg-zinc-950">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Code of Conduct
                    </CardTitle>
                    <CardDescription className="text-zinc-400">Expected behavior for all participants</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                      <h3 className="mb-2 font-medium">Respect & Integrity</h3>
                      <p className="text-zinc-400">
                        All participants are expected to treat each other with respect and dignity. Harassment,
                        discrimination, or disrespectful behavior of any kind will not be tolerated. Maintain academic
                        integrity by submitting only your original work and properly citing any references or resources
                        used.
                      </p>
                    </div>
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                      <h3 className="mb-2 font-medium">Fair Play</h3>
                      <p className="text-zinc-400">
                        Compete fairly and honestly. Do not attempt to gain unfair advantages through cheating,
                        exploiting loopholes, or any other dishonest means. Report any bugs or issues with the contest
                        platform to the organizers immediately.
                      </p>
                    </div>
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                      <h3 className="mb-2 font-medium">Communication</h3>
                      <p className="text-zinc-400">
                        Maintain professional communication in all contest-related interactions. Use appropriate
                        language and be constructive in your feedback. Avoid sharing misleading information or
                        disrupting the contest experience for others.
                      </p>
                    </div>
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                      <h3 className="mb-2 font-medium">Consequences of Violations</h3>
                      <p className="text-zinc-400">
                        Violations of the code of conduct may result in warnings, point deductions, disqualification
                        from the current contest, or banning from future contests. Serious violations may be reported to
                        university authorities for further action.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="judging" className="space-y-4 pt-4">
                <Card className="border-zinc-800 bg-zinc-950">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Judging Criteria
                    </CardTitle>
                    <CardDescription className="text-zinc-400">How submissions are evaluated</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                      <h3 className="mb-2 font-medium">Correctness (40%)</h3>
                      <p className="text-zinc-400">
                        The solution must correctly solve the problem and pass all test cases. Partial credit may be
                        awarded for solutions that pass some but not all test cases.
                      </p>
                    </div>
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                      <h3 className="mb-2 font-medium">Efficiency (30%)</h3>
                      <p className="text-zinc-400">
                        Solutions are evaluated based on time and space complexity. More efficient solutions will
                        receive higher scores. This includes algorithm choice, data structure selection, and
                        optimization techniques.
                      </p>
                    </div>
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                      <h3 className="mb-2 font-medium">Code Quality (20%)</h3>
                      <p className="text-zinc-400">
                        Code should be well-structured, readable, and maintainable. This includes proper naming
                        conventions, comments, modularization, and adherence to best practices for the chosen
                        programming language.
                      </p>
                    </div>
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                      <h3 className="mb-2 font-medium">Creativity & Innovation (10%)</h3>
                      <p className="text-zinc-400">
                        Novel approaches and creative solutions may receive additional points, especially in open-ended
                        challenges and hackathons. This criterion rewards thinking outside the box and innovative
                        problem-solving.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="faq" className="space-y-4 pt-4">
                <Card className="border-zinc-800 bg-zinc-950">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      Frequently Asked Questions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1" className="border-zinc-800">
                        <AccordionTrigger className="text-left">
                          Can I participate in multiple contests simultaneously?
                        </AccordionTrigger>
                        <AccordionContent className="text-zinc-400">
                          Yes, you can register for and participate in multiple contests that run concurrently. However,
                          make sure you can manage your time effectively to submit quality solutions for each contest.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2" className="border-zinc-800">
                        <AccordionTrigger className="text-left">
                          What happens if I face technical issues during a contest?
                        </AccordionTrigger>
                        <AccordionContent className="text-zinc-400">
                          If you encounter technical issues during a contest, immediately contact the support team
                          through the help button on the contest page. Depending on the nature and severity of the
                          issue, the contest organizers may provide additional time or alternative arrangements.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3" className="border-zinc-800">
                        <AccordionTrigger className="text-left">
                          Can I use code snippets from online resources?
                        </AccordionTrigger>
                        <AccordionContent className="text-zinc-400">
                          For standard algorithms and data structures, you may use code snippets from online resources,
                          but you must cite the source in your comments. However, using code that directly solves the
                          specific contest problem is prohibited and will be considered plagiarism.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-4" className="border-zinc-800">
                        <AccordionTrigger className="text-left">
                          How are ties resolved in the leaderboard?
                        </AccordionTrigger>
                        <AccordionContent className="text-zinc-400">
                          In case of a tie in points, the submission time is used as a tiebreaker, with earlier
                          submissions ranked higher. If the tie persists, additional factors such as code quality and
                          efficiency metrics may be considered.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-5" className="border-zinc-800">
                        <AccordionTrigger className="text-left">Can I appeal a judging decision?</AccordionTrigger>
                        <AccordionContent className="text-zinc-400">
                          Yes, you can appeal a judging decision within 24 hours of the results being announced. Submit
                          your appeal through the contest platform with a detailed explanation of why you believe the
                          decision should be reconsidered. Appeals are reviewed by a panel of judges, and their decision
                          is final.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription className="text-zinc-400">Contact our support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                  <h3 className="mb-2 font-medium">Contest Support</h3>
                  <p className="text-sm text-zinc-400">For technical issues or questions during contests</p>
                  <p className="mt-1 text-sm">support@krmucodebattle.edu</p>
                </div>
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                  <h3 className="mb-2 font-medium">Rules Clarification</h3>
                  <p className="text-sm text-zinc-400">For questions about contest rules or guidelines</p>
                  <p className="mt-1 text-sm">rules@krmucodebattle.edu</p>
                </div>
                <Button className="w-full">Contact Support</Button>
              </CardContent>
            </Card>

            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 transition-colors hover:bg-zinc-800"
                >
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>Contest Preparation Guide</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 transition-colors hover:bg-zinc-800"
                >
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>Algorithm Cheat Sheet</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 transition-colors hover:bg-zinc-800"
                >
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>Coding Best Practices</span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

function Menu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}
