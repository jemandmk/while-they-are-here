import { DailyReminderForm } from "../DailyReminderForm";
import { SectionHeading } from "../ui/SectionHeading";

/** Feature C wrapper — the dark Daily Human Check-In subscription module. */
export function CheckInSection(): JSX.Element {
  return (
    <section id="checkin" className="bg-slate px-7 py-[11vh] text-linen">
      <div className="mx-auto max-w-[1080px]">
        <SectionHeading
          onDark
          tag="The Ritual, daily"
          title="Receive Your Daily Human Check-In."
          intro="One small nudge a day. Not a notification to clear — a reminder to record sixty seconds of someone you love before the ordinary slips away."
        />
        <DailyReminderForm />
      </div>
    </section>
  );
}
