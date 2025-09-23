namespace LearningAuthAPI.Services
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string to, string subject, string body);
    }

    public class EmailSender : IEmailSender
    {
        public Task SendEmailAsync(string to, string subject, string body)
        {
            // For now just log to console
            Console.WriteLine($"Email to {to}: {subject} - {body}");
            return Task.CompletedTask;
        }
    }
}
