using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobApplicationTracker.Models
{
    public class Application
    {
        [Key]
        public int Id {  get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Company { get; set; } = string.Empty;

        [Column(TypeName = "nvarchar(150)")]
        public string Link { get; set; } = string.Empty;

        [Column(TypeName = "datetime")]
        public DateTime DateApplied { get; set; }

        [Column(TypeName = "nvarchar(20)")]
        public string ApplicationStatus { get; set; } = string.Empty;

        [Column(TypeName = "nvarchar(100)")]
        public string ResumeVersion { get; set; } = string.Empty;

    }
}
