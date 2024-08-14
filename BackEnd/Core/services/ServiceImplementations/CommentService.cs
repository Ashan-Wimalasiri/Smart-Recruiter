using Domain.Entities;
using Domain.RepositoryInterfaces;
using ServiceInterfaces.IServices;

namespace services.ServiceImplementations;

public class CommentService : ICommentService
{
    private readonly ICommentRepository _CommentRepository;

    public CommentService(ICommentRepository commentRepository)
    {
        _CommentRepository = commentRepository;
    }

    // update comments in Applicants page
    public async Task<bool> UpdateApplicantComment(int jobId, int candidateId, int adminId, string commentText)
    {
        return await _CommentRepository.UpdateApplicantComment(jobId, candidateId, adminId, commentText);
    }

    // check whether there is a comment under relevant candidateId and jobId
    public async Task<bool> CheckApplicantComment(int jobId, int candidateId)
    {
        return await _CommentRepository.CheckApplicantComment(jobId, candidateId);
    }
}