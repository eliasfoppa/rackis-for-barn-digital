import { Layout } from "@/components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Terms & Conditions
          </h1>

          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg">
              Last updated: January 7, 2025
            </p>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. General
              </h2>
              <p>
                By using this website, you agree to these terms and conditions. If you do not
                agree to these terms, you must not use the website or any of its services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. Use of Website
              </h2>
              <p>
                The content on this website is provided for general informational purposes only. You may not
                use the website in any way that could cause damage, disable, or overload the website, or interfere
                with other users’ access.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. Intellectual Property
              </h2>
              <p>
                All content on this website, including text, images, logos, and other materials, is the property of
                Rackis för Barn or its licensors. You may not copy, reproduce, or distribute any content without
                explicit permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. Limitation of Liability (Website)
              </h2>
              <p>
                Rackis för Barn is not responsible for any direct, indirect, incidental, or consequential damages
                arising from your use of this website or its content. The website is provided "as is" without warranties
                of any kind.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Conditions of Sale (In-Person)
              </h2>
              <div className="space-y-4">
                <p>
                  The following terms govern all physical transactions and transfers of goods conducted by Rackis för Barn:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Sale "As Is":</strong> All goods are sold in their current physical state and condition at the time of purchase. The buyer acknowledges that they have been granted the opportunity to inspect the goods prior to transaction.
                  </li>
                  <li>
                    <strong>Disclaimer of Warranty:</strong> Rackis för Barn makes no warranties, express or implied, regarding the merchantability, fitness for a particular purpose, or condition of any items sold.
                  </li>
                  <li>
                    <strong>Finality of Sale:</strong> All sales are final. No refunds, returns, or exchanges will be permitted under any circumstances once the transaction is completed and the buyer has taken possession of the goods.
                  </li>
                  <li>
                    <strong>Limitation of Liability:</strong> To the maximum extent permitted by law, Rackis för Barn shall not be held liable for any injury, loss, or damage arising from the use or condition of purchased items. The organization's total liability is strictly limited to the purchase price of the item.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Changes
              </h2>
              <p>
                We reserve the right to update or modify these terms at any time. Changes become effective upon
                publication on this page. It is your responsibility to review the terms regularly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                7. Contact
              </h2>
              <p>
                For questions regarding these terms, please contact us at <a href="mailto:info@rackisforbarn.com" className="text-primary hover:underline">info@rackisforbarn.com</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;